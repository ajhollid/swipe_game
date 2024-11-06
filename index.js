import DollarQRecognizer from "./DollarQ/DollarQRecognizer.js";
import Character from "./Character.js";
import Game from "./Game.js";

const gameCanvas = document.getElementById("gameCanvas");
const touchCanvas = document.getElementById("touchCanvas");

const mainChar = new Character(150, 0, "./images/didi.png");
const dollarQRecognizer = new DollarQRecognizer();

const game = new Game(
  Character,
  window,
  gameCanvas,
  touchCanvas,
  dollarQRecognizer
);
game.initialize(mainChar);
