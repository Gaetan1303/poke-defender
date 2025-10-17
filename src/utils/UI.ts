export class UI {
  draw(ctx: CanvasRenderingContext2D, score: number, hp: number, maxHp: number) {
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '20px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`Pokémon vaincus: ${score}`, 10, 30);
    ctx.fillText(`PV Base: ${hp}/${maxHp}`, 10, 60);
  }

  gameOver(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, score: number) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);
    ctx.font = '24px Arial';
    ctx.fillText(`Score final: ${score}`, canvas.width / 2, canvas.height / 2 + 50);
  }
}
