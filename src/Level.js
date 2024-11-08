class Level {
  constructor(Character, Stack, levelNumber) {
    this.Character = Character;
    this.Stack = Stack;
    this.levelNumber = levelNumber;
    this.enemies = new this.Stack();
    this.enemies.push(new Character(150, 10, "boss"));
    for (let i = 0; i < this.levelNumber + 3; i++) {
      this.enemies.push(new Character(50, 3));
    }
  }

  getEnemies() {
    return this.enemies;
  }
}

export default Level;
