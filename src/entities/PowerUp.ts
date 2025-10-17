import { GameObject } from './GameObject';
import { Howl } from 'howler';

export type PowerType = 'triple' | 'shield' | 'slowmo';

export class PowerUp extends GameObject {
  private vy = 2;
  readonly type: PowerType;
  private static pickup = new Howl({ src: ['assets/sfx/pickup.wav'], volume: 0.5 });

  constructor(x: number, y: number) {
    const types: PowerType[] = ['triple', 'shield', 'slowmo'];
    super(x, y, 40, 40);
    this.type = types[Math.floor(Math.random() * types.length)];
  }

  update() {
    this.y += this.vy;
  }

  draw(ctx: CanvasRenderingContext2D) {
    // icône emoji simple
    const icons = { triple: '⚡', shield: '🛡️', slowmo: '❄️' };
    ctx.font = '28px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(icons[this.type], this.cx, this.cy);
  }

  isOut(canvasHeight: number) {
    return this.y > canvasHeight;
  }

  onCollect() {
    PowerUp.pickup.play();
  }
}