import DollarQRecognizer from "../lib/DollarQ/DollarQRecognizer.js";
import Character from "./Character.js";
import Stack from "./Stack.js";
import Game from "./Game.js";
import Level from "./Level.js";
import GameScreen from "./GameScreen.js";
import TouchScreen from "./TouchScreen.js";

const gameCanvas = document.getElementById("gameCanvas");
const touchCanvas = document.getElementById("touchCanvas");

const mainChar = new Character(150, 0, "main");
const dollarQRecognizer = new DollarQRecognizer();
const gameScreen = new GameScreen(gameCanvas);
const touchScreen = new TouchScreen(touchCanvas, dollarQRecognizer);
const game = new Game(Stack, Character, Level, window, gameScreen, touchScreen);
game.initialize(mainChar);
