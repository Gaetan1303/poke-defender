
import { Player } from '../entities/Player';
import { Earth } from '../entities/Earth';
import { EnemySpawner } from '../utils/EnemySpawner';
import { UI } from '../utils/UI';
import { Input } from '../utils/Input';
import { Missile } from '../entities/Missile';

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private player: Player;
  private earth: Earth;
  private spawner: EnemySpawner;
  private ui = new UI();
  private running = true;
  private missiles: Missile[] = [];

  constructor(canvasId: string) {
    const c = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!c) throw new Error('Canvas introuvable');
    this.canvas = c;
    this.ctx = c.getContext('2d')!;
    this.player = new Player(c.width / 2 - 30, c.height - 100);
    this.earth = new Earth();
    this.spawner = new EnemySpawner(this.missiles, this.earth, this.player);
    Input.init(this.player, this.canvas, this.missiles);
    this.loop();
  }

  private loop = () => {
    this.update();
    this.draw();
    if (this.running) requestAnimationFrame(this.loop);
  };

  private update() {
    if (!this.running) return;
    Input.update(this.player, this.canvas.width);
    this.player.update(this.canvas.width);
    this.spawner.update(this.canvas);
    this.earth.update();
    
    // Collision ennemi-joueur
    this.spawner.enemies.forEach(e => {
      if (e.overlaps(this.player)) {
        this.running = false;
      }
    });

    if (this.earth.isDead()) this.running = false;
  }

  private draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawBackground();
    this.player.draw(this.ctx);
    this.earth.draw(this.ctx, this.canvas.width / 2, this.canvas.height - 30);
    this.spawner.draw(this.ctx);
    this.ui.draw(this.ctx, this.spawner.score, this.earth.hp, this.earth.maxHp);
    if (!this.running) this.ui.gameOver(this.ctx, this.canvas, this.spawner.score);
  }

  private drawBackground() {
    const g = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
    g.addColorStop(0, '#1a1a2e');
    g.addColorStop(1, '#0f3460');
    this.ctx.fillStyle = g;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
}