/**
 * PhaserCombatFx.ts — Phaser 3 Tactical Combat VFX Engine
 * Dự án: Trấn Quốc Phò Mã Gia (镇国驸马爷)
 * 
 * BẢO TỒN 100% HIỆU ỨNG CHIẾN TRẬN PHASER 3:
 * - Mưa dông bão táp 60 giọt nước nghiêng góc 2.5D
 * - 3 vòng hào quang trận địa mặt đất (Tả dực, Trung lộ, Hữu dực)
 * - Vệt chém kiếm tóe tia lửa vàng ròng (slash)
 * - Đại hồng thủy quét sạch chiến trường (flood)
 * - Mưa tên vạn tiễn xuyên tâm (arrowVolley)
 * - Thiết kỵ xung kích tạo sóng chấn động (cavalryCharge)
 */

declare const Phaser: any;
declare const window: any;

export class PhaserCombatFx {
  private containerId: string;
  private game: any = null;
  private sceneRef: any = null;
  private isInitialized: boolean = false;

  constructor(containerId: string = 'battle-phaser-container') {
    this.containerId = containerId;
  }

  public init(): void {
    if (typeof Phaser === 'undefined' || this.isInitialized) return;
    const container = document.getElementById(this.containerId);
    if (!container) return;
    this.isInitialized = true;

    try {
      container.innerHTML = '';
      const w = container.clientWidth || 1000;
      const h = container.clientHeight || 600;

      const self = this;
      const config = {
        type: Phaser.AUTO,
        parent: this.containerId,
        transparent: true,
        width: w,
        height: h,
        scene: {
          create: function(this: any) {
            self.sceneRef = this;
            const width = this.scale.width;
            const height = this.scale.height;

            // Ambient storm rain particles
            this.rainGraphics = this.add.graphics();
            this.rainDrops = [];
            for (let i = 0; i < 60; i++) {
              this.rainDrops.push({
                x: Phaser.Math.Between(0, width),
                y: Phaser.Math.Between(0, height),
                speed: Phaser.Math.Between(15, 25),
                len: Phaser.Math.Between(10, 20)
              });
            }

            // 3 Tactical Lane Ground Sectors (Perspective Ellipses)
            this.laneGraphics = this.add.graphics();
            this.drawBattlefieldLanes();
          },
          update: function(this: any) {
            if (!this.rainGraphics) return;
            const width = this.scale.width;
            const height = this.scale.height;
            this.rainGraphics.clear();
            this.rainGraphics.lineStyle(1.5, 0x93c5fd, 0.35);

            for (let i = 0; i < this.rainDrops.length; i++) {
              const r = this.rainDrops[i];
              this.rainGraphics.beginPath();
              this.rainGraphics.moveTo(r.x, r.y);
              this.rainGraphics.lineTo(r.x - 3, r.y + r.len);
              this.rainGraphics.strokePath();

              r.x -= 1.5;
              r.y += r.speed;
              if (r.y > height) {
                r.y = 0;
                r.x = Phaser.Math.Between(0, width);
              }
            }
          },
          drawBattlefieldLanes: function(this: any) {
            const width = this.scale.width;
            const height = this.scale.height;
            const g = this.laneGraphics;
            g.clear();

            // Lane 1: Tả Dực (Left Flank) Ground Beacon
            g.lineStyle(2, 0x0284c7, 0.4);
            g.strokeEllipse(width * 0.22, height * 0.52, 140, 60);

            // Lane 2: Trung Lộ (Center Gate) Ground Beacon
            g.lineStyle(2, 0xfbbf24, 0.5);
            g.strokeEllipse(width * 0.50, height * 0.54, 180, 75);

            // Lane 3: Hữu Dực (Right Flank) Ground Beacon
            g.lineStyle(2, 0xf59e0b, 0.4);
            g.strokeEllipse(width * 0.78, height * 0.52, 140, 60);
          }
        }
      };

      this.game = new Phaser.Game(config);
      console.log('[Phaser 3] Full tactical card battler battlefield engine active');
    } catch (err) {
      console.warn('Phaser 3 init error:', err);
    }
  }

  public slash(x: number = 500, y: number = 300): void {
    if (!this.sceneRef) return;
    const g = this.sceneRef.add.graphics();
    g.lineStyle(5, 0xfbbf24, 1);
    g.beginPath();
    g.moveTo(x - 100, y - 70);
    g.lineTo(x + 100, y + 70);
    g.strokePath();

    for (let i = 0; i < 12; i++) {
      const spark = this.sceneRef.add.circle(x, y, Phaser.Math.Between(2, 4), 0xfffbeb, 1);
      this.sceneRef.tweens.add({
        targets: spark,
        x: x + Phaser.Math.Between(-80, 80),
        y: y + Phaser.Math.Between(-80, 80),
        alpha: 0,
        duration: 300,
        onComplete: () => spark.destroy()
      });
    }

    this.sceneRef.tweens.add({
      targets: g,
      alpha: 0,
      scaleX: 1.6,
      scaleY: 1.6,
      duration: 350,
      onComplete: () => g.destroy()
    });
  }

  public flood(): void {
    if (!this.sceneRef) return;
    const w = this.sceneRef.scale.width;
    const h = this.sceneRef.scale.height;

    const wave = this.sceneRef.add.rectangle(w / 2, h / 2, w, h, 0x0284c7, 0.55);
    this.sceneRef.tweens.add({
      targets: wave,
      alpha: 0,
      duration: 900,
      onComplete: () => wave.destroy()
    });

    for (let i = 0; i < 40; i++) {
      const drop = this.sceneRef.add.circle(
        Phaser.Math.Between(50, w - 50),
        Phaser.Math.Between(h * 0.3, h * 0.8),
        Phaser.Math.Between(4, 10),
        0x38bdf8,
        0.8
      );
      this.sceneRef.tweens.add({
        targets: drop,
        y: drop.y + Phaser.Math.Between(-100, 100),
        alpha: 0,
        scale: 1.8,
        duration: 800,
        onComplete: () => drop.destroy()
      });
    }
  }

  public arrowVolley(startX: number, startY: number, targetX: number, targetY: number): void {
    if (!this.sceneRef) return;
    for (let i = 0; i < 5; i++) {
      const arrow = this.sceneRef.add.rectangle(
        startX + Phaser.Math.Between(-20, 20),
        startY + Phaser.Math.Between(-15, 15),
        20, 3,
        0xfbbf24
      );
      this.sceneRef.tweens.add({
        targets: arrow,
        x: targetX + Phaser.Math.Between(-30, 30),
        y: targetY + Phaser.Math.Between(-30, 30),
        duration: 400 + i * 60,
        ease: 'Quad.easeOut',
        onComplete: () => arrow.destroy()
      });
    }
  }

  public cavalryCharge(laneX: number, laneY: number): void {
    if (!this.sceneRef) return;
    const shock = this.sceneRef.add.circle(laneX, laneY, 15, 0xf59e0b, 0.8);
    this.sceneRef.tweens.add({
      targets: shock,
      radius: 80,
      alpha: 0,
      duration: 500,
      onComplete: () => shock.destroy()
    });
  }

  public resize(): void {
    const container = document.getElementById(this.containerId);
    if (!container || !this.game) return;
    const w = container.clientWidth || window.innerWidth || 1000;
    const h = container.clientHeight || window.innerHeight || 600;
    if (this.game.scale) {
      this.game.scale.resize(w, h);
    }
  }
}
