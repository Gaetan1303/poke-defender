// Classes du jeu PokéDefender

// Classe abstraite pour les entités du jeu
abstract class GameObject {
  protected x: number;
  protected y: number;
  protected width: number;
  protected height: number;

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  abstract draw(ctx: CanvasRenderingContext2D): void;
  abstract update(): void;

  getX(): number { return this.x; }
  getY(): number { return this.y; }
  getWidth(): number { return this.width; }
  getHeight(): number { return this.height; }

  isColliding(other: GameObject): boolean {
    return this.x < other.x + other.width &&
           this.x + this.width > other.x &&
           this.y < other.y + other.height &&
           this.y + this.height > other.y;
  }
}

// Classe du joueur (Pokémon défenseur)
class Player extends GameObject {
  private speed: number = 5;
  private color: string = "#FF6B6B";

  constructor(x: number, y: number) {
    super(x, y, 40, 50);
  }

  moveLeft(): void {
    if (this.x > 0) this.x -= this.speed;
  }

  moveRight(canvasWidth: number): void {
    if (this.x + this.width < canvasWidth) this.x += this.speed;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = "#FFD700";
    ctx.fillRect(this.x + 5, this.y + 5, 30, 15);
    ctx.fillRect(this.x + 10, this.y + 25, 20, 15);
  }

  update(): void {
    // Le joueur est contrôlé par les touches
  }
}

// Classe des missiles
class Missile extends GameObject {
  private speed: number = 7;

  constructor(x: number, y: number) {
    super(x + 15, y - 10, 10, 20);
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "#FFD700";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = "#FFA500";
    ctx.fillRect(this.x + 2, this.y + 2, 6, 8);
  }

  update(): void {
    this.y -= this.speed;
  }

  isOutOfBounds(): boolean {
    return this.y < -20;
  }
}

// Classe des Pokémon ennemis
class EnemyPokemon extends GameObject {
  private speed: number;
  private pokemonTypes: string[] = ["🔴", "🟣", "🟢", "🔵"];
  private type: string;

  constructor(x: number, y: number) {
    super(x, y, 40, 40);
    this.speed = Math.random() * 2 + 1;
    this.type = this.pokemonTypes[Math.floor(Math.random() * this.pokemonTypes.length)];
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "#9B59B6";
    ctx.beginPath();
    ctx.arc(this.x + 20, this.y + 20, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "24px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(this.type, this.x + 20, this.y + 20);
  }

  update(): void {
    this.y += this.speed;
  }

  isOutOfBounds(canvasHeight: number): boolean {
    return this.y > canvasHeight;
  }
}

// Classe de la Terre (base à protéger)
class Earth {
  private hp: number = 3;
  private maxHp: number = 3;

  takeDamage(): void {
    if (this.hp > 0) this.hp--;
  }

  getHp(): number { return this.hp; }
  getMaxHp(): number { return this.maxHp; }

  isAlive(): boolean {
    return this.hp > 0;
  }

  draw(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    ctx.fillStyle = "#3498DB";
    ctx.beginPath();
    ctx.arc(x, y, 25, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#2ECC71";
    ctx.beginPath();
    ctx.arc(x - 15, y - 10, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + 15, y + 10, 8, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Classe principale du jeu
class PokéDefenderGame {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private player: Player;
  private earth: Earth;
  private missiles: Missile[] = [];
  private enemies: EnemyPokemon[] = [];
  private score: number = 0;
  private gameOver: boolean = false;
  private lastShotTime: number = 0;
  private lastEnemySpawn: number = 0;
  private keys: { [key: string]: boolean } = {};

  constructor(canvasId: string) {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!canvas) throw new Error("Canvas not found");

    this.canvas = canvas;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    
    this.player = new Player(this.canvas.width / 2 - 20, this.canvas.height - 80);
    this.earth = new Earth();

    this.setupEventListeners();
    this.gameLoop();
  }

  private setupEventListeners(): void {
    window.addEventListener("keydown", (e) => {
      this.keys[e.key.toLowerCase()] = true;
      if (e.key === " ") {
        e.preventDefault();
        this.shoot();
      }
    });

    window.addEventListener("keyup", (e) => {
      this.keys[e.key.toLowerCase()] = false;
    });
  }

  private shoot(): void {
    const now = Date.now();
    if (now - this.lastShotTime > 200) {
      this.missiles.push(new Missile(this.player.getX(), this.player.getY()));
      this.lastShotTime = now;
    }
  }

  private spawnEnemy(): void {
    const now = Date.now();
    if (now - this.lastEnemySpawn > 800 && this.enemies.length < 10) {
      const x = Math.random() * (this.canvas.width - 40);
      this.enemies.push(new EnemyPokemon(x, -40));
      this.lastEnemySpawn = now;
    }
  }

  private update(): void {
    if (this.gameOver) return;

    // Mouvements du joueur
    if (this.keys["q"] || this.keys["arrowleft"]) this.player.moveLeft();
    if (this.keys["d"] || this.keys["arrowright"]) this.player.moveRight(this.canvas.width);

    this.player.update();
    this.spawnEnemy();

    // Mise à jour des missiles
    this.missiles.forEach(m => m.update());
    this.missiles = this.missiles.filter(m => !m.isOutOfBounds());

    // Mise à jour des ennemis
    this.enemies.forEach(e => e.update());
    this.enemies = this.enemies.filter(e => !e.isOutOfBounds(this.canvas.height));

    // Collisions missile-ennemi
    for (let i = this.missiles.length - 1; i >= 0; i--) {
      for (let j = this.enemies.length - 1; j >= 0; j--) {
        if (this.missiles[i].isColliding(this.enemies[j])) {
          this.missiles.splice(i, 1);
          this.enemies.splice(j, 1);
          this.score++;
          break;
        }
      }
    }

    // Collisions ennemi-joueur
    this.enemies = this.enemies.filter(e => {
      if (e.isColliding(this.player)) {
        this.gameOver = true;
        return false;
      }
      return true;
    });

    // Collisions ennemi-Terre
    this.enemies = this.enemies.filter(e => {
      if (e.getY() > this.canvas.height - 100) {
        this.earth.takeDamage();
        if (!this.earth.isAlive()) this.gameOver = true;
        return false;
      }
      return true;
    });
  }

  private draw(): void {
    // Fond
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
    gradient.addColorStop(0, "#1a1a2e");
    gradient.addColorStop(1, "#0f3460");
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Étoiles
    this.ctx.fillStyle = "#FFFFFF";
    for (let i = 0; i < 100; i++) {
      const x = (i * 73) % this.canvas.width;
      const y = (i * 97) % this.canvas.height;
      this.ctx.fillRect(x, y, 1, 1);
    }

    // Entités
    this.player.draw(this.ctx);
    this.earth.draw(this.ctx, this.canvas.width / 2, this.canvas.height - 30);
    this.missiles.forEach(m => m.draw(this.ctx));
    this.enemies.forEach(e => e.draw(this.ctx));

    // UI
    this.ctx.fillStyle = "#FFFFFF";
    this.ctx.font = "20px Arial";
    this.ctx.fillText(`Pokémon vaincus: ${this.score}`, 10, 30);
    this.ctx.fillText(`PV Base: ${this.earth.getHp()}/${this.earth.getMaxHp()}`, 10, 60);

    // Game Over
    if (this.gameOver) {
      this.ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.fillStyle = "#FFFFFF";
      this.ctx.font = "48px Arial";
      this.ctx.textAlign = "center";
      this.ctx.fillText("GAME OVER", this.canvas.width / 2, this.canvas.height / 2);
      this.ctx.font = "24px Arial";
      this.ctx.fillText(`Score final: ${this.score}`, this.canvas.width / 2, this.canvas.height / 2 + 50);
      this.ctx.fillText("Recharge la page pour rejouer", this.canvas.width / 2, this.canvas.height / 2 + 100);
    }
  }

  private gameLoop(): void {
    this.update();
    this.draw();
    requestAnimationFrame(() => this.gameLoop());
  }
}

// Initialisation
window.addEventListener("DOMContentLoaded", () => {
  new PokéDefenderGame("gameCanvas");
});