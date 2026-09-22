/**
 * PixiMistAtmosphere.ts — PixiJS Atmospheric Ink-Wash & Gold Dust Engine
 * Dự án: Trấn Quốc Phò Mã Gia (镇国驸马爷)
 * Tạo hiệu ứng sương mù thủy mặc và bụi vàng hoàng kim trôi nổi mờ ảo.
 */

declare const PIXI: any;

export class PixiMistAtmosphere {
  private canvasId: string;
  private app: any = null;

  constructor(canvasId: string = 'vn-pixi-canvas') {
    this.canvasId = canvasId;
  }

  public async init(): Promise<void> {
    if (typeof PIXI === 'undefined') {
      console.warn('[PixiMistAtmosphere] Thư viện PixiJS chưa được nạp.');
      return;
    }

    const canvas = document.getElementById(this.canvasId) as HTMLCanvasElement;
    if (!canvas) return;

    try {
      const parent = canvas.parentElement || document.body;
      const app = new PIXI.Application();
      await app.init({
        canvas: canvas,
        resizeTo: parent,
        backgroundAlpha: 0,
        antialias: true
      });

      const mistContainer = new PIXI.Container();
      app.stage.addChild(mistContainer);

      const particles: any[] = [];
      const count = 40;

      for (let i = 0; i < count; i++) {
        const g = new PIXI.Graphics();
        const isGold = Math.random() < 0.75;
        const color = isGold ? 0xfbbf24 : 0xe2e8f0;
        const baseAlpha = isGold ? (0.25 + Math.random() * 0.45) : (0.08 + Math.random() * 0.15);
        const radius = 1.2 + Math.random() * 2.2;

        if (typeof g.circle === 'function') {
          g.circle(0, 0, radius).fill({ color, alpha: baseAlpha });
        } else {
          g.beginFill(color, baseAlpha);
          g.drawCircle(0, 0, radius);
          g.endFill();
        }

        g.x = Math.random() * (app.screen.width || 1200);
        g.y = Math.random() * (app.screen.height || 700);
        g.vx = (Math.random() - 0.5) * 0.35;
        g.vy = -0.25 - Math.random() * 0.45;
        (g as any).baseAlpha = baseAlpha;
        (g as any).pulseSpeed = 0.02 + Math.random() * 0.04;
        (g as any).pulsePhase = Math.random() * Math.PI * 2;

        mistContainer.addChild(g);
        particles.push(g);
      }

      app.ticker.add((delta: any) => {
        const d = typeof delta === 'object' ? (delta.deltaTime || 1) : delta;
        particles.forEach(p => {
          p.x += p.vx * d;
          p.y += p.vy * d;
          p.pulsePhase += p.pulseSpeed * d;
          p.alpha = p.baseAlpha * (0.65 + 0.35 * Math.sin(p.pulsePhase));

          if (p.y < -20) {
            p.y = (app.screen.height || 700) + 20;
            p.x = Math.random() * (app.screen.width || 1200);
          }
          if (p.x < -20) p.x = (app.screen.width || 1200) + 20;
          if (p.x > (app.screen.width || 1200) + 20) p.x = -20;
        });
      });

      this.app = app;
      (window as any).pixiApp = app;
      console.log('[PixiJS] WebGL atmospheric ink-mist active');
    } catch (err) {
      console.warn('[PixiMistAtmosphere] Init error:', err);
    }
  }

  public destroy(): void {
    if (this.app) {
      try {
        this.app.destroy(true, { children: true });
      } catch (e) {
        console.warn(e);
      }
      this.app = null;
    }
  }
}
