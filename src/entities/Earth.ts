import { GameObject } from './GameObject';

export class Earth extends GameObject {
  hp = 3;
  readonly maxHp = 3;

  constructor() {
    super(0, 0, 60, 60);
  }

  takeDamage() {
    if (this.hp > 0) this.hp--;
  }

  isDead() {
    return this.hp <= 0;
  }

  update() {}

  draw(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.fillStyle = '#3498DB';
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#2ECC71';
    ctx.beginPath();
    ctx.arc(x - 18, y - 12, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + 18, y + 12, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#E74C3C';
    ctx.beginPath();
    ctx.arc(x, y - 5, 8, 0, Math.PI * 2);
    ctx.fill();
  }
}