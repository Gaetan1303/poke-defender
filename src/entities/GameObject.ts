
export abstract class GameObject {
  constructor(
    public x: number,
    public y: number,
    public w: number,
    public h: number
  ) {}

  abstract update(...args: any[]): void;
  abstract draw(ctx: CanvasRenderingContext2D, ...args: any[]): void;

  get cx() { return this.x + this.w / 2; }
  get cy() { return this.y + this.h / 2; }

  getX() { return this.x; }
  getY() { return this.y; }

  bounds() {
    return { left: this.x, top: this.y, right: this.x + this.w, bottom: this.y + this.h };
  }

  overlaps(other: GameObject) {
    const a = this.bounds(), b = other.bounds();
    return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
  }
}