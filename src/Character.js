import Stack from "./Stack.js";
import batImg from "/assets/images/characters/bat.svg";
import frankensteinImg from "/assets/images/characters/frankenstein.svg";
import ghostImg from "/assets/images/characters/ghost.svg";
import oneEyeImg from "/assets/images/characters/one_eye.svg";
import spiderImg from "/assets/images/characters/spider.svg";
import skeletonImg from "/assets/images/characters/skeleton.svg";
import vampireImg from "/assets/images/characters/vampire.svg";

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
      batImg,
      frankensteinImg,
      ghostImg,
      oneEyeImg,
      spiderImg,
      skeletonImg,
      vampireImg,
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

  die(onComplete) {
    const originalX = this.x;
    const originalY = this.y;
    const startTime = performance.now();
    const duration = 1000; // 1 second animation
    const startRadius = this.radius;
    let rotation = 0;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = elapsed / duration;

      if (progress >= 1) {
        this.radius = 0;
        if (onComplete) {
          onComplete();
        }
        return;
      }

      // Spin faster as it gets smaller (multiply by 10 for more rotations)
      rotation = progress * Math.PI * 10;

      // Shrink radius based on progress
      this.radius = startRadius * (1 - progress);

      // Add a slight outward spiral as it spins
      const spiral = 50 * progress;
      const spiralX = Math.cos(rotation) * spiral;
      const spiralY = Math.sin(rotation) * spiral;

      this.move({
        x: originalX + spiralX,
        y: originalY + spiralY,
      });

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }

  shake() {
    const originalX = this.x;
    const originalY = this.y;
    const startTime = performance.now();
    const duration = 500; // shake duration in ms
    const intensity = 5; // maximum shake distance in pixels

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = elapsed / duration;

      if (progress >= 1) {
        // Animation complete, return to original position
        this.move({ x: originalX, y: originalY });
        return;
      }

      // Calculate shake offset using sine waves
      const decreasingIntensity = intensity * (1 - progress); // gradually reduce shake
      const xOffset = Math.sin(progress * 40) * decreasingIntensity;
      const yOffset = Math.cos(progress * 40) * decreasingIntensity;

      // Apply shake offset
      this.move({
        x: originalX + xOffset,
        y: originalY + yOffset,
      });

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }
  damage() {
    if (!this.targets.isEmpty()) {
      this.targets.pop();
    }
    this.shake();
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

  moveTowards(target, distance) {
    const dx = target.x - this.x;
    const dy = target.y - this.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    const unitX = dx / length;
    const unitY = dy / length;
    // Add wobble to the movement
    const time = Date.now() / 1000;
    const wobbleAmount = 0.5;
    const xWobble = Math.sin(time * 4) * wobbleAmount;
    const yWobble = Math.cos(time * 6) * wobbleAmount;
    this.x += unitX * distance + xWobble;
    this.y += unitY * distance + yWobble;
  }

  hasCollidedWith(other) {
    const dx = other.x - this.x;
    const dy = other.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < this.radius + other.radius;
  }
}

export default Character;
