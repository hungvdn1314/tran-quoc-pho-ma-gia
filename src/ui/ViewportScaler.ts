/**
 * ViewportScaler.ts — 16:9 Virtual Resolution Scaler & Cinematic Letterbox
 * Trấn Quốc Phò Mã Gia (镇国驸马爷)
 */

export class ViewportScaler {
  private viewportEl: HTMLElement;
  private topBar: HTMLElement | null;
  private bottomBar: HTMLElement | null;
  private leftBar: HTMLElement | null;
  private rightBar: HTMLElement | null;

  private targetWidth: number = 1920;
  private targetHeight: number = 1080;
  private targetRatio: number = 16 / 9;

  constructor(viewportId: string = 'game-viewport') {
    this.viewportEl = document.getElementById(viewportId) || document.body;
    this.topBar = document.getElementById('letterbox-top');
    this.bottomBar = document.getElementById('letterbox-bottom');
    this.leftBar = document.getElementById('letterbox-left');
    this.rightBar = document.getElementById('letterbox-right');

    this.init();
  }

  private init(): void {
    this.updateScale();
    window.addEventListener('resize', () => this.updateScale());
  }

  public updateScale(): void {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const currentRatio = windowWidth / windowHeight;

    let scale: number;
    let actualWidth: number;
    let actualHeight: number;

    if (currentRatio > this.targetRatio) {
      // Màn hình quá rộng (Pillarbox - 2 dải đen hai bên)
      scale = windowHeight / this.targetHeight;
      actualWidth = this.targetWidth * scale;
      actualHeight = windowHeight;

      const sideBarWidth = (windowWidth - actualWidth) / 2;
      if (this.leftBar) this.leftBar.style.width = `${sideBarWidth}px`;
      if (this.rightBar) this.rightBar.style.width = `${sideBarWidth}px`;
      if (this.topBar) this.topBar.style.height = '0px';
      if (this.bottomBar) this.bottomBar.style.height = '0px';
    } else {
      // Màn hình quá hẹp / cao (Letterbox - 2 dải đen trên dưới)
      scale = windowWidth / this.targetWidth;
      actualWidth = windowWidth;
      actualHeight = this.targetHeight * scale;

      const topBarHeight = (windowHeight - actualHeight) / 2;
      if (this.topBar) this.topBar.style.height = `${topBarHeight}px`;
      if (this.bottomBar) this.bottomBar.style.height = `${topBarHeight}px`;
      if (this.leftBar) this.leftBar.style.width = '0px';
      if (this.rightBar) this.rightBar.style.width = '0px';
    }

    this.viewportEl.style.width = `${this.targetWidth}px`;
    this.viewportEl.style.height = `${this.targetHeight}px`;
    this.viewportEl.style.transform = `scale(${scale})`;
  }
}
