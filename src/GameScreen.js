import BaseScreen from "./BaseScreen.js";
class GameScreen extends BaseScreen {
  constructor(gameCanvas) {
    super(gameCanvas);
  }

  getRandomPointAtEdge() {
    // Decide which edge to spawn on (0: top, 1: right, 2: bottom, 3: left)
    const edge = Math.floor(Math.random() * 4);
    let x, y;

    switch (edge) {
      case 0: // top edge
        x = Math.random() * this.canvas.width;
        y = 0;
        break;
      case 1: // right edge
        x = this.canvas.width;
        y = Math.random() * this.canvas.height;
        break;
      case 2: // bottom edge
        x = Math.random() * this.canvas.width;
        y = this.canvas.height;
        break;
      case 3: // left edge
        x = 0;
        y = Math.random() * this.canvas.height;
        break;
    }

    return { x, y };
  }

  initialize(mainChar) {
    mainChar.move({
      x: this.canvas.width / 2,
      y: this.canvas.height / 2,
    });
    mainChar.draw(this.context);
  }
}

export default GameScreen;
