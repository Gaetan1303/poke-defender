import { GameObject } from './GameObject';
import { Missile } from './Missile';

export class Player extends GameObject {
  private lastShot = 0;

  constructor(x: number, y: number) {
    super(x, y, 60, 60);
  }

  update(canvasWidth: number) {
    if (this.x < 0) this.x = 0;
    if (this.x + this.w > canvasWidth) this.x = canvasWidth - this.w;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#FF6B6B';
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 2;
    ctx.strokeRect(this.x - 2, this.y - 2, this.w + 4, this.h + 4);
  }

  shoot(missiles: Missile[]) {
    const now = Date.now();
    if (now - this.lastShot < 200) return;
    this.lastShot = now;
    missiles.push(new Missile(this.cx, this.y));
  }
}
