import { EnemyPokemon } from '../entities/EnemyPokemon';
import { Missile } from '../entities/Missile';
import { Player } from '../entities/Player';
import { Earth } from '../entities/Earth';

export class EnemySpawner {
  enemies: EnemyPokemon[] = [];
  score = 0;
  private lastSpawn = 0;

  constructor(
    private missiles: Missile[],
    private earth: Earth,
    private player: Player
  ) {}

  update(canvas: HTMLCanvasElement) {
    const now = Date.now();
    if (now - this.lastSpawn > 800 && this.enemies.length < 10) {
      const x = Math.random() * (canvas.width - 60);
      const id = Math.floor(Math.random() * 151) + 1;
      this.enemies.push(new EnemyPokemon(x, id));
      this.lastSpawn = now;
    }

    this.enemies.forEach(e => e.update(canvas.width));
    this.enemies = this.enemies.filter(e => !e.isOut(canvas.height));

    this.missiles.forEach(m => m.update());
    this.missiles = this.missiles.filter(m => !m.isOut());

    // Collisions missile-ennemi
    for (let i = this.missiles.length - 1; i >= 0; i--) {
      for (let j = this.enemies.length - 1; j >= 0; j--) {
        if (this.missiles[i].overlaps(this.enemies[j])) {
          this.enemies[j].onHit();
          this.missiles.splice(i, 1);
          this.enemies.splice(j, 1);
          this.score++;
          break;
        }
      }
    }

    // Collisions ennemi-base
    this.enemies = this.enemies.filter(e => {
      if (e.getY() > canvas.height - 100) {
        this.earth.takeDamage();
        return false;
      }
      return true;
    });
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.enemies.forEach(e => e.draw(ctx));
    this.missiles.forEach(m => m.draw(ctx));
  }
}
