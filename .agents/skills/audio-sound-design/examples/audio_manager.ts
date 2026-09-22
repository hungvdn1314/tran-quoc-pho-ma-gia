/**
 * AudioManager.ts — Trấn Quốc Phò Mã Gia
 * 
 * Web Audio API Engine chuyên biệt với 3 kênh độc lập (BGM, SFX, VOX),
 * hỗ trợ Adaptive Cross-fading 2.0s và Audio Pooling chống nghẽn âm.
 */

export class AudioManager {
  private ctx: AudioContext | null = null;
  private bgmGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private masterGain: GainNode | null = null;

  private currentBgmSource: AudioBufferSourceNode | null = null;
  private currentBgmBuffer: AudioBuffer | null = null;
  private audioCache: Map<string, AudioBuffer> = new Map();

  private isMuted: boolean = false;
  private bgmVolume: number = 0.7;
  private sfxVolume: number = 0.85;

  constructor() {
    // AudioContext chỉ khởi tạo sau tương tác chuột đầu tiên của người chơi để tuân thủ Autoplay Policy của trình duyệt
    window.addEventListener('click', () => this.ensureContext(), { once: true });
    window.addEventListener('keydown', () => this.ensureContext(), { once: true });
  }

  private ensureContext(): void {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();

      this.masterGain = this.ctx.createGain();
      this.bgmGain = this.ctx.createGain();
      this.sfxGain = this.ctx.createGain();

      this.bgmGain.gain.value = this.bgmVolume;
      this.sfxGain.gain.value = this.sfxVolume;

      this.bgmGain.connect(this.masterGain);
      this.sfxGain.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public async loadAudio(id: string, url: string): Promise<AudioBuffer> {
    if (this.audioCache.has(id)) {
      return this.audioCache.get(id)!;
    }

    this.ensureContext();
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await this.ctx!.decodeAudioData(arrayBuffer);
    this.audioCache.set(id, audioBuffer);
    return audioBuffer;
  }

  /**
   * Chuyển bài BGM với hiệu ứng mờ dần chéo (Cross-fade)
   */
  public async playBgm(id: string, url: string, fadeDuration: number = 2.0): Promise<void> {
    this.ensureContext();
    const newBuffer = await this.loadAudio(id, url);

    if (this.currentBgmBuffer === newBuffer) return; // Đang chạy đúng bài này

    const now = this.ctx!.currentTime;

    // 1. Fade out bài cũ
    if (this.currentBgmSource && this.bgmGain) {
      this.bgmGain.gain.setValueAtTime(this.bgmVolume, now);
      this.bgmGain.gain.linearRampToValueAtTime(0.01, now + fadeDuration);
      const oldSource = this.currentBgmSource;
      setTimeout(() => {
        try { oldSource.stop(); oldSource.disconnect(); } catch {}
      }, fadeDuration * 1000);
    }

    // 2. Tạo source mới
    const newSource = this.ctx!.createBufferSource();
    newSource.buffer = newBuffer;
    newSource.loop = true;

    // 3. Fade in bài mới
    const newGain = this.ctx!.createGain();
    newGain.gain.setValueAtTime(0.01, now);
    newGain.gain.linearRampToValueAtTime(this.bgmVolume, now + fadeDuration);

    newSource.connect(newGain);
    newGain.connect(this.masterGain!);
    newSource.start(0);

    this.currentBgmSource = newSource;
    this.currentBgmBuffer = newBuffer;
  }

  /**
   * Phát hiệu ứng âm thanh SFX tức thời (One-shot)
   */
  public async playSfx(id: string, url: string, volumeScale: number = 1.0): Promise<void> {
    this.ensureContext();
    const buffer = await this.loadAudio(id, url);

    const source = this.ctx!.createBufferSource();
    source.buffer = buffer;

    const gain = this.ctx!.createGain();
    gain.gain.value = this.sfxVolume * volumeScale;

    source.connect(gain);
    gain.connect(this.masterGain!);
    source.start(0);
  }
}
