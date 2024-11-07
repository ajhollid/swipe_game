import DollarQRecognizer from "../lib/DollarQ/DollarQRecognizer.js";
import Character from "./Character.js";
import Game from "./Game.js";
import GameScreen from "./GameScreen.js";
import TouchScreen from "./TouchScreen.js";
import didiImg from "/assets/images/characters/didi.png";

const gameCanvas = document.getElementById("gameCanvas");
const touchCanvas = document.getElementById("touchCanvas");

const mainChar = new Character(150, 0, didiImg);
const dollarQRecognizer = new DollarQRecognizer();
const gameScreen = new GameScreen(gameCanvas);
const touchScreen = new TouchScreen(touchCanvas, dollarQRecognizer);
const game = new Game(Character, window, gameScreen, touchScreen);
game.initialize(mainChar);
