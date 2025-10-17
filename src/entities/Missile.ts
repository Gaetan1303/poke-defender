import { GameObject } from './GameObject';

export class Missile extends GameObject {
  private vy = -10;

  constructor(x: number, y: number) {
    super(x - 10, y, 20, 20);
  }

  update() {
    this.y += this.vy;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const cx = this.cx, cy = this.cy, r = 10;
    ctx.fillStyle = '#FF0000';
    ctx.beginPath();
    ctx.arc(cx, cy, r, Math.PI, 0);
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI);
    ctx.fill();
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(cx, cy, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  isOut() {
    return this.y + this.h < 0;
  }
}
