import { Preloader } from './utils/Preloader';
import { Game } from './systems/Game';

window.addEventListener('DOMContentLoaded', async () => {
  const loader = document.getElementById('loader') as HTMLDivElement;
  
  try {
    await Preloader.load();
    if (loader) loader.style.display = 'none';
    new Game('gameCanvas');
  } catch (e) {
    console.error('Erreur au démarrage:', e);
    if (loader) loader.textContent = 'Erreur: ' + (e as Error).message;
  }
});
