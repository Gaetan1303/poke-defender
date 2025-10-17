import { Player } from '../entities/Player';
import { Missile } from '../entities/Missile';

export class Input {
  private static keys: Record<string, boolean> = {};

  static init(player: Player, canvas: HTMLCanvasElement, missiles: Missile[]) {
    window.addEventListener('keydown', (e) => {
      Input.keys[e.key.toLowerCase()] = true;
      if (e.key === ' ') {
        e.preventDefault();
        player.shoot(missiles);
      }
    });

    window.addEventListener('keyup', (e) => {
      Input.keys[e.key.toLowerCase()] = false;
    });
  }

  static update(player: Player, canvasWidth: number) {
    const speed = 5;
    if (Input.keys['q'] || Input.keys['arrowleft']) {
      player.x -= speed;
    }
    if (Input.keys['d'] || Input.keys['arrowright']) {
      player.x += speed;
    }
  }
}
