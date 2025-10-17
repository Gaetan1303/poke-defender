import { EnemyPokemon } from './EnemyPokemon';
import { Howl } from 'howler';

export class BossPokemon extends EnemyPokemon {
  private maxHp = 20;
  private hp = 20;
  private pattern = 0;
  private timer = 0;
  private static bossSfx = new Howl({ src: ['assets/sfx/boss.wav'], volume: 0.6 });

  constructor(x: number) {
    super(x, 150);
    this.w = 120;
    this.h = 120;
    BossPokemon.bossSfx.play();
  }

  update(canvasWidth: number) {
    this.timer++;
    switch (this.pattern) {
      case 0:
        this.y += 1;
        if (this.y > 80) this.pattern = 1;
        break;
      case 1:
        this.x += Math.sin(this.timer * 0.03) * 4;
        this.x = Math.max(0, Math.min(canvasWidth - this.w, this.x));
        if (this.timer % 120 === 0) this.pattern = 2;
        break;
      case 2:
        this.y += 6;
        if (this.y > 300) {
          this.y = 80;
          this.pattern = 1;
        }
        break;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    super.draw(ctx);
    const barW = 100;
    const barH = 8;
    const x = this.cx - barW / 2;
    const y = this.y - 20;
    ctx.fillStyle = '#000';
    ctx.fillRect(x, y, barW, barH);
    ctx.fillStyle = '#0F0';
    ctx.fillRect(x, y, (this.hp / this.maxHp) * barW, barH);
  }

  takeDamage() {
    this.hp--;
  }

  isDead() {
    return this.hp <= 0;
  }
}