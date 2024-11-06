import Stack from "./Stack.js";
class Character {
  constructor(radius, difficulty, imageUrl) {
    this.x = 0;
    this.y = 0;
    this.radius = radius;
    this.radius = radius;
    this.difficulty = difficulty;
    this.targetTemplates = ["|", "-"];
    this.targets = new Stack();
    this.generateTargets();

    const imageUrls = [
      "./images/ghost.svg",
      "./images/bat.svg",
      "./images/spider.svg",
    ];

    this.image = new Image();
    if (imageUrl === undefined) {
      this.image.src = imageUrls[Math.floor(Math.random() * imageUrls.length)];
    } else {
      this.image.src = imageUrl;
    }
  }

  getRandomColor() {
    const colors = ["blue", "red", "green", "purple", "orange", "pink"];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  getTopTarget() {
    return this.targets.peek();
  }

  damage() {
    if (!this.targets.isEmpty()) {
      this.targets.pop();
    }
  }

  isDead() {
    return this.targets.isEmpty();
  }

  generateTargets() {
    for (let i = 0; i < this.difficulty; i++) {
      const randomIndex = Math.floor(
        Math.random() * this.targetTemplates.length
      );
      this.targets.push(this.targetTemplates[randomIndex]);
    }
  }

  draw(context) {
    context.drawImage(
      this.image,
      this.x - this.radius, // Center the image horizontally
      this.y - this.radius, // Center the image vertically
      this.radius * 2,
      this.radius * 2
    );

    // Draw the targets stack as lines
    const stackArray = this.targets.toArray().reverse();
    const lineLength = 20; // Length of each line
    const lineWidth = 3; // Width of the line stroke
    const spacing = 25; // Space between each line
    const startX = this.x - ((stackArray.length - 1) * spacing) / 2; // Center the sequence
    const y = this.y - this.radius - 30; // Position above circle

    context.strokeStyle = "black";
    context.lineWidth = lineWidth;

    stackArray.forEach((target, index) => {
      const xPos = startX + index * spacing;
      context.beginPath();
      if (target === "|") {
        // Vertical line
        context.moveTo(xPos, y);
        context.lineTo(xPos, y + lineLength);
      } else if (target === "-") {
        // Horizontal line
        context.moveTo(xPos - lineLength / 2, y + lineLength / 2);
        context.lineTo(xPos + lineLength / 2, y + lineLength / 2);
      }
      context.stroke();
      context.closePath();
    });
  }
  move({ x, y }) {
    this.x = x;
    this.y = y;
  }

  hasCollidedWith(other) {
    const dx = other.x - this.x;
    const dy = other.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < this.radius + other.radius;
  }
}

export default Character;
