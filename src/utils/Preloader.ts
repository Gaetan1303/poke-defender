export abstract class Preloader {
  static load(): Promise<void> {
    return Promise.resolve();
  }
}
