import BaseScreen from "./BaseScreen.js";
class TouchScreen extends BaseScreen {
  constructor(touchCanvas, dollarQRecognizer) {
    super(touchCanvas);
    this.dollarQRecognizer = dollarQRecognizer;
    this.FADE_TIMEOUT = 300;

    // Bind methods for proper this context
    this.touchStart = this.touchStart.bind(this);
    this.touchMove = this.touchMove.bind(this);
    this.touchEnd = this.touchEnd.bind(this);
    this.getTouchPosition = this.getTouchPosition.bind(this);

    this.currentPoints = [];
    this.fadeAnimationId = null;
    this.fadeTimeout = null;
    this.handleTouchResult = () => console.log("Callback not set");
    this.initialize();
  }

  fadeAnimation() {
    const startTime = performance.now();
    const duration = 500; // Animation duration in milliseconds

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const opacity = 1 - progress;

      if (opacity <= 0) {
        this.clearCanvas();
        this.fadeAnimationId = null;
        return;
      }

      this.clearCanvas();
      this.context.strokeStyle = `rgba(0, 0, 0, ${opacity})`;
      this.context.beginPath();
      this.points.forEach((point, index) => {
        if (index === 0) {
          this.context.moveTo(point.x, point.y);
        } else {
          this.context.lineTo(point.x, point.y);
        }
      });
      this.context.stroke();

      this.fadeAnimationId = requestAnimationFrame(animate);
    };

    this.fadeAnimationId = requestAnimationFrame(animate);
  }
  setHandleTouchResult(callback) {
    this.handleTouchResult = callback;
  }

  getTouchPosition(event) {
    const touch = event.touches[0];

    const rect = this.canvas.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    return { x, y };
  }

  touchStart(event) {
    event.preventDefault();

    // Clear any existing fade animation
    if (this.fadeAnimationId) {
      cancelAnimationFrame(this.fadeAnimationId);
      this.fadeAnimationId = null;
    }
    if (this.fadeTimeout) {
      clearTimeout(this.fadeTimeout);
      this.fadeTimeout = null;
    }

    // Reset the drawing state
    this.isDrawing = true;
    this.currentPoints = [];
    this.clearCanvas();
    this.context.strokeStyle = "rgba(0, 0, 0, 1)";

    // Move to the first point
    const { x, y } = this.getTouchPosition(event);
    this.currentPoints.push({ x, y });
    this.context.moveTo(x, y);
    this.context.beginPath();
  }

  touchMove(event) {
    event.preventDefault();
    if (!this.isDrawing) return;

    // Draw a line to the current point
    const { x, y } = this.getTouchPosition(event);
    this.currentPoints.push({ x, y });
    this.context.lineTo(x, y); // This advances the current position
    this.context.stroke();
  }

  touchEnd(event) {
    event.preventDefault();
    if (!this.isDrawing) return;

    // Finish drawing
    this.isDrawing = false;
    this.context.closePath();

    // Copy current points to fading points
    this.points = [...this.currentPoints];

    // Recognize the gesture
    const result = this.dollarQRecognizer.Recognize(this.points);
    if (result !== -1) {
      this.handleTouchResult(result);
    } else {
      console.log("Shape not recognized");
    }

    this.fadeTimeout = setTimeout(() => {
      this.fadeAnimation();
    }, this.FADE_TIMEOUT);
  }

  initialize() {
    this.canvas.addEventListener("touchstart", this.touchStart);
    this.canvas.addEventListener("touchmove", this.touchMove);
    this.canvas.addEventListener("touchend", this.touchEnd);
  }
}
export default TouchScreen;
