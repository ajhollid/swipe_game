class Game {
  constructor(Character, window, gameScreen, touchScreen) {
    this.Character = Character;
    this.enemies = [];
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
    this.maxEnemies = 5;
  }

  spawnInitialEnemies() {
    for (let i = 0; i < this.initialEnemyCount; i++) {
      this.spawnEnemy();
    }
  }

  spawnEnemy() {
    if (this.enemies.length >= this.maxEnemies) return;
    const enemy = new this.Character(50, 3);
    this.addEnemy(enemy);
  }

  addEnemy(enemy) {
    this.enemies.push(enemy);
    enemy.move(this.gameScreen.getRandomPointAtEdge());
    enemy.draw(this.gameScreen.getContext());
  }

  resizeCanvas() {
    this.gameScreen.resizeCanvas();
    this.touchScreen.resizeCanvas();
  }

  gameLoop(timestamp) {
    const deltaTime = timestamp - this.lastTime;
    this.lastTime = timestamp;
    this.gameScreen.clearCanvas();

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
    while (this.enemies.length < this.maxEnemies) {
      this.spawnEnemy();
    }

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
