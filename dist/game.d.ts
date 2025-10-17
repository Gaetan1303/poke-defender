declare abstract class GameObject {
    protected x: number;
    protected y: number;
    protected width: number;
    protected height: number;
    constructor(x: number, y: number, width: number, height: number);
    abstract draw(ctx: CanvasRenderingContext2D): void;
    abstract update(): void;
    getX(): number;
    getY(): number;
    getWidth(): number;
    getHeight(): number;
    isColliding(other: GameObject): boolean;
}
declare class Player extends GameObject {
    private speed;
    private color;
    constructor(x: number, y: number);
    moveLeft(): void;
    moveRight(canvasWidth: number): void;
    draw(ctx: CanvasRenderingContext2D): void;
    update(): void;
}
declare class Missile extends GameObject {
    private speed;
    constructor(x: number, y: number);
    draw(ctx: CanvasRenderingContext2D): void;
    update(): void;
    isOutOfBounds(): boolean;
}
declare class EnemyPokemon extends GameObject {
    private speed;
    private pokemonTypes;
    private type;
    constructor(x: number, y: number);
    draw(ctx: CanvasRenderingContext2D): void;
    update(): void;
    isOutOfBounds(canvasHeight: number): boolean;
}
declare class Earth {
    private hp;
    private maxHp;
    takeDamage(): void;
    getHp(): number;
    getMaxHp(): number;
    isAlive(): boolean;
    draw(ctx: CanvasRenderingContext2D, x: number, y: number): void;
}
declare class PokéDefenderGame {
    private canvas;
    private ctx;
    private player;
    private earth;
    private missiles;
    private enemies;
    private score;
    private gameOver;
    private lastShotTime;
    private lastEnemySpawn;
    private keys;
    constructor(canvasId: string);
    private setupEventListeners;
    private shoot;
    private spawnEnemy;
    private update;
    private draw;
    private gameLoop;
}
