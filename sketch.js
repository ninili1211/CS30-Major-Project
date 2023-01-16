// Mini-Game Collection (CS30 Major Project)
// Nini Li
// 11/22/2022

//Start Page
let state = "start";
let startBackImg;
let mainPageBackImg;
let startButtonImg;
let chessButtonImg;
let checkersButtonImg;
let connectFourButtonImg;
let ticTacToeButtonImg;

//preload images
function preload() {
  startBackImg = loadImage("startPageBackground.jpg");
  mainPageBackImg = loadImage("mainPageBackground.jpg");
  startButtonImg = loadImage("startButton.png");
  chessButtonImg = loadImage("chessButton.png");
  checkersButtonImg = loadImage("checkersButton.png");
  connectFourButtonImg = loadImage("connectFourButton.png");
  ticTacToeButtonImg = loadImage("ticTacToeButton.png");
}

//initial setup
function setup() {
  createCanvas(windowWidth, windowHeight);
}

//start screen
function draw() {
  background(220);
  if (state === "start") {
    startScreen();
  }
  else if (state === "main") {
    mainScreen();
  }
}

//button functions
function keyPressed() {
  if (keyCode === 32) {
    state = "main";
  }
  if (keyCode === 49) {
    state = "chess";
  }
  if (keyCode === 50) {
    state = "checkers";
  }
  if (keyCode === 51) {
    state = "connect four";
  }
  if (keyCode === 52) {
    state = "tic-tac-toe";
  }
}

//start screen
function startScreen() {
  let startButtonX = windowWidth * 0.33;
  let startButtonY = windowHeight * 0.75;
  imageMode(CORNER);
  image(startBackImg, 0, 0, width, height);
  image(startButtonImg, startButtonX, startButtonY, width * 0.35, height * 0.2);
}

//main screen
function mainScreen() {
  
  image(mainPageBackImg, 0, 0, width, height);
  image(chessButtonImg, windowWidth * 0.33, 0, width * 0.35, height * 0.2);
  image(checkersButtonImg, 0, 0, width * 0.35, height * 0.2);
  image(connectFourButtonImg, 0, 0, width * 0.35, height * 0.2);
  image(ticTacToeButtonImg, 0, 0, width * 0.35, height * 0.2);
}