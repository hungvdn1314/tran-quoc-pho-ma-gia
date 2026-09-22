/**
 * ProceduralAmbientBgm.ts — Imperial Pentatonic Cổ Phong Music Engine
 * Trấn Quốc Phò Mã Gia (镇国驸马爷)
 * 
 * TRIẾT LÝ ÂM THANH: TẢ THỰC CỔ PHONG THỦY MẶC (EASTERN GRIMDARK REALISM)
 * - 100% Thuật toán Web Audio API tạo nhạc nền Cổ Cầm, Đàn Tranh, Phong Linh Cung Đình
 * - Tuyệt đối không dùng sóng răng cưa (sawtooth) gây tiếng ù điện tử
 * - Giai điệu ngũ cung có bố cục câu nhạc (Motifs) và khoảng lặng thi vị (5-8s breathing room)
 * - Tự động kích hoạt khi có tương tác người dùng, không lỗi Autoplay
 */

export class ProceduralAmbientBgm {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isPlaying: boolean = false;
  private isMuted: boolean = false;
  private phraseTimer: any = null;
  private chimeTimer: any = null;
  private currentVolume: number = 0.22;

  // Thang âm Ngũ Cung Thương Điệu (D Minor Pentatonic: D - F - G - A - C)
  // Mang âm hưởng trầm hùng, u hoài, vương giả của sử thi Tam Quốc
  private readonly PENTATONIC: Record<string, number> = {
    D2: 73.42,
    A2: 110.00,
    D3: 146.83,
    F3: 174.61,
    G3: 196.00,
    A3: 220.00,
    C4: 261.63,
    D4: 293.66,
    F4: 349.23,
    G4: 392.00,
    A4: 440.00,
    C5: 523.25,
    D5: 587.33
  };

  // Các câu nhạc cổ phong đặc trưng (Motifs)
  private readonly MOTIFS: string[][] = [
    // Motif 1: Uy Nghi Cung Đình
    ['D3', 'A3', 'D4', 'C4', 'A3'],
    // Motif 2: Trầm Mặc Quân Cơ
    ['A3', 'G3', 'F3', 'D3', 'F3', 'D3'],
    // Motif 3: Bát Quái Phong Vân
    ['D4', 'F4', 'G4', 'A4', 'G4', 'F4', 'D4'],
    // Motif 4: Thương Mang Quan Ải
    ['G3', 'A3', 'C4', 'D4', 'A3'],
    // Motif 5: Phò Mã Hàn Vi
    ['D3', 'F3', 'A3', 'G3', 'D3'],
    // Motif 6: Khải Hoàn Tướng Tinh
    ['A3', 'C4', 'D4', 'F4', 'D4', 'A3']
  ];

  constructor() {
    const handleFirstInteraction = () => {
      this.init();
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('keydown', handleFirstInteraction, { once: true });
  }

  public init(): void {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return;
    }

    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;

    this.ctx = new AudioCtx();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(this.currentVolume, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (!this.isPlaying) {
      this.startPalaceWind();
      this.startImperialDrone();
      this.startMotifCycle();
      this.startWindChimeCycle();
      this.isPlaying = true;
    }
  }

  /**
   * 1. Gió Thoảng Cung Đình (Soft Palace Mist & Wind)
   * Tạo không gian thở tự nhiên qua Pink Noise + Bandpass Filter 320Hz, không chói gắt.
   */
  private startPalaceWind(): void {
    if (!this.ctx || !this.masterGain) return;

    const bufferSize = this.ctx.sampleRate * 4;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

    // Thuật toán Paul Kellet Pink Noise
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
      b6 = white * 0.115926;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(320, this.ctx.currentTime);
    filter.Q.setValueAtTime(1.8, this.ctx.currentTime);

    // LFO quét nhẹ tần số gió như làn gió thổi qua bức rèm lụa
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.04, this.ctx.currentTime); // 25s mỗi chu kỳ
    lfoGain.gain.setValueAtTime(120, this.ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    const windGain = this.ctx.createGain();
    windGain.gain.setValueAtTime(0.04, this.ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(windGain);
    windGain.connect(this.masterGain);

    whiteNoise.start();
    lfo.start();
  }

  /**
   * 2. Đế Khí Trầm Ẩn (Warm Imperial Sub-Harmonic Sine Drone)
   * Sử dụng sóng sine thuần khiết ở 55Hz & 110Hz (KHÔNG dùng Sawtooth gây ù rền)
   */
  private startImperialDrone(): void {
    if (!this.ctx || !this.masterGain) return;

    // Sub-bass fundamental A1 (55Hz)
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(55.0, this.ctx.currentTime);

    // Warm overtone A2 (110Hz)
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(110.0, this.ctx.currentTime);

    // Breathing Gain LFO (nhịp thở chậm 20 giây)
    const breathLfo = this.ctx.createOscillator();
    const breathGain = this.ctx.createGain();
    breathLfo.type = 'sine';
    breathLfo.frequency.setValueAtTime(0.05, this.ctx.currentTime);
    breathGain.gain.setValueAtTime(0.02, this.ctx.currentTime);

    gain1.gain.setValueAtTime(0.05, this.ctx.currentTime);
    gain2.gain.setValueAtTime(0.025, this.ctx.currentTime);

    breathLfo.connect(breathGain);
    breathGain.connect(gain1.gain);

    osc1.connect(gain1);
    osc2.connect(gain2);
    gain1.connect(this.masterGain);
    gain2.connect(this.masterGain);

    osc1.start();
    osc2.start();
    breathLfo.start();
  }

  /**
   * 3. Gảy Đàn Cổ Cầm / Đàn Tranh (Acoustic Silk String Pluck Synthesis)
   * Mô phỏng vật lý móng gảy vào dây tơ và thân đàn gỗ ngô đồng.
   */
  private playSilkString(noteName: string, timeOffset: number = 0): void {
    if (!this.ctx || !this.masterGain) return;

    const freq = this.PENTATONIC[noteName] || 220;
    const now = this.ctx.currentTime + timeOffset;

    // a. Transient móng gảy vào dây (Pluck impulse)
    const pluckBuffer = this.ctx.createBuffer(1, Math.floor(this.ctx.sampleRate * 0.015), this.ctx.sampleRate);
    const pluckData = pluckBuffer.getChannelData(0);
    for (let i = 0; i < pluckData.length; i++) {
      pluckData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (pluckData.length * 0.2));
    }
    const pluckNoise = this.ctx.createBufferSource();
    pluckNoise.buffer = pluckBuffer;
    const pluckFilter = this.ctx.createBiquadFilter();
    pluckFilter.type = 'bandpass';
    pluckFilter.frequency.setValueAtTime(1400, now);
    pluckFilter.Q.setValueAtTime(2.5, now);
    const pluckGain = this.ctx.createGain();
    pluckGain.gain.setValueAtTime(0.06, now);
    pluckGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.015);
    pluckNoise.connect(pluckFilter);
    pluckFilter.connect(pluckGain);
    pluckGain.connect(this.masterGain);
    pluckNoise.start(now);

    // b. Âm cơ bản (Fundamental Sine)
    const oscFund = this.ctx.createOscillator();
    const gainFund = this.ctx.createGain();
    oscFund.type = 'sine';
    oscFund.frequency.setValueAtTime(freq, now);

    // Kỹ thuật Án Âm / Doanh Ngâm (Gentle Guqin Vibrato sau 0.4s)
    const vibrato = this.ctx.createOscillator();
    const vibratoGain = this.ctx.createGain();
    vibrato.type = 'sine';
    vibrato.frequency.setValueAtTime(4.2, now);
    vibratoGain.gain.setValueAtTime(0, now);
    vibratoGain.gain.setValueAtTime(0, now + 0.4);
    vibratoGain.gain.linearRampToValueAtTime(1.8, now + 0.8);
    vibrato.connect(vibratoGain);
    vibratoGain.connect(oscFund.frequency);

    // ADSR của đàn tơ: Nảy nhanh (12ms), ngân dài (2.6 - 3.8s)
    const decayTime = freq < 200 ? 3.8 : (freq < 400 ? 2.8 : 2.0);
    gainFund.gain.setValueAtTime(0.001, now);
    gainFund.gain.linearRampToValueAtTime(0.18, now + 0.012);
    gainFund.gain.exponentialRampToValueAtTime(0.0001, now + decayTime);

    oscFund.connect(gainFund);
    gainFund.connect(this.masterGain);
    oscFund.start(now);
    vibrato.start(now);
    oscFund.stop(now + decayTime + 0.1);
    vibrato.stop(now + decayTime + 0.1);

    // c. Họa âm bậc 2 (2nd Harmonic - Ấm gỗ)
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2.002, now); // Lệch 2 cents tạo độ dày
    gain2.gain.setValueAtTime(0.001, now);
    gain2.gain.linearRampToValueAtTime(0.08, now + 0.01);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + (decayTime * 0.6));

    osc2.connect(gain2);
    gain2.connect(this.masterGain);
    osc2.start(now);
    osc2.stop(now + decayTime * 0.6 + 0.05);

    // d. Họa âm bậc 3 (3rd Harmonic)
    const osc3 = this.ctx.createOscillator();
    const gain3 = this.ctx.createGain();
    osc3.type = 'sine';
    osc3.frequency.setValueAtTime(freq * 3.001, now);
    gain3.gain.setValueAtTime(0.001, now);
    gain3.gain.linearRampToValueAtTime(0.03, now + 0.008);
    gain3.gain.exponentialRampToValueAtTime(0.0001, now + (decayTime * 0.35));

    osc3.connect(gain3);
    gain3.connect(this.masterGain);
    osc3.start(now);
    osc3.stop(now + decayTime * 0.35 + 0.05);
  }

  /**
   * 4. Chuông Gió Đồng Cung Đình (Imperial Temple Wind Chime)
   * Rung ngân thanh thoát ở tần số cao, điểm xuyết mỗi 20-35s.
   */
  private playWindChime(): void {
    if (!this.ctx || !this.masterGain) return;

    const chimeFreqs = [1056, 1320, 1584, 1980];
    const freq = chimeFreqs[Math.floor(Math.random() * chimeFreqs.length)];
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.06, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.8);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 4.0);
  }

  /**
   * 5. Vòng Lặp Câu Nhạc Ngũ Cung (Motif Cycle with Meditative Pauses)
   */
  private startMotifCycle(): void {
    const playNextMotif = () => {
      if (!this.ctx || !this.isPlaying) return;

      const motif = this.MOTIFS[Math.floor(Math.random() * this.MOTIFS.length)];
      let delay = 0;

      // Đánh từng nốt trong câu nhạc
      motif.forEach((note) => {
        this.playSilkString(note, delay);
        // Nhịp gảy thi vị: 650ms đến 950ms giữa các nốt
        delay += 0.65 + Math.random() * 0.3;
      });

      // KHOẢNG LẶNG THI VỊ (5.5s đến 9.0s) sau khi kết thúc một câu nhạc
      // Tạo cảm giác tĩnh lặng, uy nghi, sâu thẳm của cung cấm cổ đại
      const phraseSilence = 5500 + Math.random() * 3500;
      const totalDelay = (delay * 1000) + phraseSilence;

      this.phraseTimer = setTimeout(playNextMotif, totalDelay);
    };

    // Bắt đầu câu đầu tiên sau 1.5s
    this.phraseTimer = setTimeout(playNextMotif, 1500);
  }

  /**
   * 6. Chu Kỳ Chuông Đồng Thư Giản (Distant Chime Cycle)
   */
  private startWindChimeCycle(): void {
    const scheduleNextChime = () => {
      if (!this.ctx || !this.isPlaying) return;

      this.playWindChime();
      // Ngẫu nhiên 18s - 32s một tiếng chuông phong linh thoảng qua
      const delay = 18000 + Math.random() * 14000;
      this.chimeTimer = setTimeout(scheduleNextChime, delay);
    };

    this.chimeTimer = setTimeout(scheduleNextChime, 8000);
  }

  public setVolume(volume: number): void {
    this.currentVolume = Math.max(0, Math.min(1, volume));
    if (this.masterGain && this.ctx && !this.isMuted) {
      this.masterGain.gain.setValueAtTime(this.currentVolume, this.ctx.currentTime);
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      const targetGain = this.isMuted ? 0 : this.currentVolume;
      this.masterGain.gain.setValueAtTime(targetGain, this.ctx.currentTime);
    }
    return this.isMuted;
  }
}
