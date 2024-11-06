class Game {
  constructor(Character, window, gameCanvas, touchCanvas, DollarQRecognizer) {
    this.Character = Character;
    this.enemies = [];
    this.lastTime = 0;
    this.speed = 0.03; // smaller number = slower
    this.gameLoop = this.gameLoop.bind(this);
    this.window = window;
    this.gameCanvas = gameCanvas;
    this.gameContext = this.gameCanvas.getContext("2d");
    this.touchCanvas = touchCanvas;
    this.touchContext = this.touchCanvas.getContext("2d");
    this.dollarQRecognizer = DollarQRecognizer;
    this.isDrawing = false;
    this.currentPoints = [];
    this.fadingPoints = [];
    this.initialize.bind(this);
    this.fadeTimeout = 200;
    this.maxEnemies = 3;
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

  clearCanvas() {
    this.gameContext.clearRect(
      0,
      0,
      this.gameCanvas.width,
      this.gameCanvas.height
    );
  }

  getRandomPointAtEdge() {
    // Decide which edge to spawn on (0: top, 1: right, 2: bottom, 3: left)
    const edge = Math.floor(Math.random() * 4);
    let x, y;

    switch (edge) {
      case 0: // top edge
        x = Math.random() * this.gameCanvas.width;
        y = 0;
        break;
      case 1: // right edge
        x = this.gameCanvas.width;
        y = Math.random() * this.gameCanvas.height;
        break;
      case 2: // bottom edge
        x = Math.random() * this.gameCanvas.width;
        y = this.gameCanvas.height;
        break;
      case 3: // left edge
        x = 0;
        y = Math.random() * this.gameCanvas.height;
        break;
    }

    return { x, y };
  }
  addEnemy(enemy) {
    this.enemies.push(enemy);
    enemy.move(this.getRandomPointAtEdge());
    enemy.draw(this.gameContext);
  }

  moveTowards(target, mover, distance) {
    const dx = target.x - mover.x;
    const dy = target.y - mover.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    const unitX = dx / length;
    const unitY = dy / length;

    const time = Date.now() / 1000;
    const wobbleAmount = 0.5;
    const xWobble = Math.sin(time * 4) * wobbleAmount;
    const yWobble = Math.cos(time * 6) * wobbleAmount;

    mover.x += unitX * distance + xWobble;
    mover.y += unitY * distance + yWobble;
  }
  resizeCanvas() {
    this.gameCanvas.width = window.innerWidth;
    this.gameCanvas.height = window.innerHeight;
    this.touchCanvas.width = window.innerWidth;
    this.touchCanvas.height = window.innerHeight;
  }

  fadeDrawing() {
    let opacity = 1.0;
    this.fadeIntervalId = setInterval(() => {
      opacity -= 0.1;
      if (opacity <= 0) {
        clearInterval(this.fadeIntervalId);
        this.fadeIntervalId = null;
        this.touchContext.clearRect(
          0,
          0,
          this.touchCanvas.width,
          this.touchCanvas.height
        );
        this.fadeTimeoutId = null;
        return;
      }

      // Redraw with new opacity
      this.touchContext.clearRect(
        0,
        0,
        this.touchCanvas.width,
        this.touchCanvas.height
      );
      this.touchContext.strokeStyle = `rgba(0, 0, 0, ${opacity})`;
      this.touchContext.beginPath();
      this.fadingPoints.forEach((point, index) => {
        if (index === 0) {
          this.touchContext.moveTo(point.x, point.y);
        } else {
          this.touchContext.lineTo(point.x, point.y);
        }
      });
      this.touchContext.stroke();
    }, 10);
  }
  gameLoop(timestamp) {
    const deltaTime = timestamp - this.lastTime;
    this.lastTime = timestamp;
    this.clearCanvas();

    this.enemies = this.enemies.filter((enemy) => !enemy.isDead());

    while (this.enemies.length < this.maxEnemies) {
      this.spawnEnemy();
    }

    this.enemies.forEach((enemy, i) => {
      this.moveTowards(this.mainChar, enemy, this.speed * deltaTime);
      enemy.draw(this.gameContext);
      this.mainChar.draw(this.gameContext);
      if (enemy.hasCollidedWith(this.mainChar)) {
        enemy.move(this.getRandomPointAtEdge());
      }
    });

    this.mainChar.draw(this.gameContext);
    requestAnimationFrame(this.gameLoop);
  }

  initialize(character) {
    // Set up canvas and register listeners
    this.resizeCanvas();
    this.window.addEventListener("resize", this.resizeCanvas);
    this.touchCanvas.addEventListener("touchstart", (event) => {
      event.preventDefault();

      // Clear any existing fade animations
      if (this.fadeTimeoutId) {
        clearTimeout(this.fadeTimeoutId);
        this.fadeTimeoutId = null;
      }
      if (this.fadeIntervalId) {
        clearInterval(this.fadeIntervalId);
        this.fadeIntervalId = null;
      }

      this.isDrawing = true;
      this.currentPoints = []; // Reset current points
      this.touchContext.clearRect(
        0,
        0,
        this.touchCanvas.width,
        this.touchCanvas.height
      );
      this.touchContext.strokeStyle = "rgba(0, 0, 0, 1)";

      const touch = event.touches[0];
      const rect = this.touchCanvas.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      this.currentPoints.push({ x, y });
      this.touchContext.beginPath();
      this.touchContext.moveTo(x, y);
    });

    touchCanvas.addEventListener("touchmove", (event) => {
      event.preventDefault();
      if (!this.isDrawing) return;
      const touch = event.touches[0];
      const rect = this.touchCanvas.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      this.currentPoints.push({ x, y });
      this.touchContext.lineTo(x, y);
      this.touchContext.stroke();
      if (!this.fadeTimeoutId) {
        this.fadeTimeoutId = setTimeout(() => {
          this.fadeDrawing();
        }, this.fadeTimeout);
      }
    });

    this.touchCanvas.addEventListener("touchend", (event) => {
      event.preventDefault();
      if (!this.isDrawing) return;
      this.isDrawing = false;

      // Copy current points to fading points
      this.fadingPoints = [...this.currentPoints];
      this.points = [...this.currentPoints]; // For gesture recognition

      if (!this.fadeTimeoutId) {
        this.fadeTimeoutId = setTimeout(() => {
          this.fadeDrawing();
        }, this.fadeTimeout);
      }

      const result = this.dollarQRecognizer.Recognize(this.points);
      if (result !== -1) {
        this.enemies.forEach((enemy) => {
          if (enemy.getTopTarget() === result.Name) {
            enemy.damage();
          }
        });
      } else {
        alert("Shape not recognized");
      }
    });

    // Start the game loop
    this.mainChar = character;
    this.mainChar.move({
      x: this.gameCanvas.width / 2,
      y: this.gameCanvas.height / 2,
    });
    this.mainChar.draw(this.gameContext);
    requestAnimationFrame(this.gameLoop);
  }
  addObject(object) {
    this.objects.push(object);
  }
}

export default Game;
