import { Howl } from 'howler';

export abstract class Preloader {
  private static promises: Promise<void>[] = [];

  static load(): Promise<void> {
    // sprites déjà dans public/assets/sprites (copiés par webpack)
    // sons
    Preloader.sound('shoot', 'assets/sfx/shoot.wav');
    Preloader.sound('hit',   'assets/sfx/hit.wav');
    Preloader.sound('boss',  'assets/sfx/boss.wav');
    return Promise.all(this.promises).then(() => {});
  }

  private static sound(name: string, url: string): void {
    this.promises.push(
      new Promise(res => {
        new Howl({ src: [url], onload: () => res() as any });
      })
    );
  }
}