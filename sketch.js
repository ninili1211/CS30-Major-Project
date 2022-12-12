// Mini-Game Collection (CS30 Major Project)
// Nini Li
// 11/22/2022

//Start Page
let state = "start";
let startBackImg;
let optionBackImg;
let startButtonImg;
let cursorImg;

function preload() {
  startBackImg = loadImage("startPageBackground.jpg");
  optionBackImg = loadImage("optionsBackground.jpg");
  startButtonImg = loadImage("startButton.png");
  cursorImg = loadImage("cursor.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  if (state === "start") {
    startScreen();
  }
  if (state === "main") {
    image(optionBackImg, 0, 0, width, height);
  }
cursor(cursorImg, mouseX, mouseY);
}

function startScreen() {
  imageMode(CORNER);
  image(startBackImg, 0, 0, width, height);
  image(startButtonImg, windowWidth * 0.33, windowHeight * 0.65, width * 0.4, height * 0.4);
  fill("#463F3A");
  textSize(50);
  textFont("Times New Roman");
  text("START GAME!!", width * 0.4, height * 0.87);
}

function startState() {
  if (state === "start") {
    startScreen();
  }
  if (state === "main") {
    image(optionBackImg, 0, 0, width, height);
  }
}