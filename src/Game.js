class Game {
  constructor(Stack, Character, Level, window, gameScreen, touchScreen) {
    this.Character = Character;
    this.Level = Level;
    this.Stack = Stack;
    this.levels = new this.Stack();
    this.currentLevel = null;
    this.enemies = [];
    this.bosses = [];
    this.dyingEnemies = [];
    this.lastTime = 0;
    this.speed = 0.06; // smaller number = slower
    this.gameLoop = this.gameLoop.bind(this);
    this.handleTouchResult = this.handleTouchResult.bind(this);
    this.window = window;
    this.gameScreen = gameScreen;
    this.touchScreen = touchScreen;
    this.isDrawing = false;
    this.initialize.bind(this);
    this.maxEnemies = 3;
    this.NO_OF_LEVELS = 2;
  }

  resizeCanvas() {
    this.gameScreen.resizeCanvas();
    this.touchScreen.resizeCanvas();
  }

  gameLoop(timestamp) {
    const deltaTime = timestamp - this.lastTime;
    this.lastTime = timestamp;
    this.gameScreen.clearCanvas();

    if (this.enemies.length === 0) {
      while (this.bosses.length !== 0) {
        this.enemies.push(this.bosses.pop());
      }
    }

    if (!this.levels.isEmpty() && this.enemies.length === 0) {
      this.currentLevel = this.levels.pop();
    }

    while (
      !this.currentLevel.getEnemies().isEmpty() &&
      this.enemies.length < this.maxEnemies
    ) {
      let enemy = this.currentLevel.getEnemies().pop();
      enemy.move(this.gameScreen.getRandomPointAtEdge());
      enemy.type !== "boss" && this.enemies.push(enemy);
      enemy.type === "boss" && this.bosses.push(enemy);
    }

    if (
      this.enemies.length === 0 &&
      this.bosses.length === 0 &&
      this.levels.isEmpty()
    ) {
      console.log("Victory");
      this.mainChar.draw(this.gameScreen.getContext());
      return;
    }

    const [alive, dead] = this.enemies.reduce(
      ([pass, fail], enemy) => {
        return enemy.isDead()
          ? [pass, [...fail, enemy]]
          : [[...pass, enemy], fail];
      },
      [[], []]
    );

    dead.forEach((deadEnemy) => {
      deadEnemy.die(() => {
        this.dyingEnemies = this.dyingEnemies.filter((e) => e !== deadEnemy);
      });
      this.dyingEnemies.push(deadEnemy);
    });

    this.dyingEnemies.forEach((enemy) => {
      enemy.draw(this.gameScreen.getContext());
    });

    this.enemies = alive;

    this.enemies.forEach((enemy, i) => {
      enemy.moveTowards(this.mainChar, this.speed * deltaTime);
      enemy.draw(this.gameScreen.getContext());
      if (enemy.hasCollidedWith(this.mainChar)) {
        enemy.move(this.gameScreen.getRandomPointAtEdge());
        this.mainChar.damage();
      }
    });

    this.mainChar.draw(this.gameScreen.getContext());
    requestAnimationFrame(this.gameLoop);
  }

  handleTouchResult(result) {
    this.enemies.forEach((enemy) => {
      if (enemy.getTopTarget() === result.Name) {
        enemy.damage();
      }
    });
  }

  initialize(mainChar) {
    // Set up canvas and register listeners
    this.resizeCanvas();
    this.window.addEventListener("resize", this.resizeCanvas);
    this.touchScreen.setHandleTouchResult(this.handleTouchResult);
    // Set up levels
    for (let i = 0; i < this.NO_OF_LEVELS; i++) {
      const level = new this.Level(
        this.Character,
        this.Stack,
        this.NO_OF_LEVELS - i - 1
      );
      this.levels.push(level);
    }
    // Start the game loop
    this.mainChar = mainChar;
    this.gameScreen.initialize(mainChar);
    requestAnimationFrame(this.gameLoop);
  }
  addObject(object) {
    this.objects.push(object);
  }
}

export default Game;
