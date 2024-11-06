class Stack {
  constructor() {
    this.stack = [];
  }

  push(item) {
    this.stack.push(item);
  }
  pop() {
    return this.stack.pop();
  }

  peek() {
    if (this.isEmpty()) {
      throw new Error("Cannot peek at an empty stack");
    }
    return this.stack[this.stack.length - 1];
  }

  isEmpty() {
    return this.stack.length === 0;
  }

  size() {
    return this.stack.length;
  }

  toArray() {
    return [...this.stack];
  }
}

export default Stack;
