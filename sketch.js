// Mini-Game Collection (CS30 Major Project)
// Nini Li
// 11/22/2022

//Start Page
let state = "start";
let startBackImg;
let optionBackImg;

function preload() {
  startBackImg = loadImage("startPageBackground.jpg");
  optionBackImg = loadImage("optionsBackground.jpg");
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
}

function mousePressed() {
  if (state === "start" && mouseInsideRect(width * 0.35, height, 600, 150)) {
    state = "main";
  } 
}

function startScreen() {
  image(startBackImg, 0, 0, width, height);
  if (mouseInsideRect(width * 0.35, height * 0.75 + 300, 400, 550)) {
    fill("gray");
  }
  else {
    fill("black");
  }
  rect(width * 0.35, height * 0.75, 500, 150);
  fill("white");
  textSize(50);
  textFont("Times New Roman");
  text("START GAME!!", width * 0.4, height * 0.87);
}

function mouseInsideRect(left, right, top, bottom) {
  return mouseX >= left && mouseX <= right &&
         mouseY >= top && mouseY <= bottom;
}