import { GameObject } from './GameObject';

export class EnemyPokemon extends GameObject {
  private vy = 1 + Math.random() * 2;

  constructor(x: number, public readonly id: number) {
    super(x, -60, 60, 60);
  }

  update(canvasWidth: number) {
    this.y += this.vy;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#9B59B6';
    ctx.beginPath();
    ctx.arc(this.cx, this.cy, 25, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#FF0000';
    ctx.lineWidth = 2;
    ctx.strokeRect(this.x - 2, this.y - 2, this.w + 4, this.h + 4);
  }

  isOut(canvasHeight: number) {
    return this.y > canvasHeight;
  }

  onHit() {
    // Sound effect here
  }
}
