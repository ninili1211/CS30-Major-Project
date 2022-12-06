// Mini-Game Collection (CS30 Major Project)
// Nini Li
// 11/22/2022

//Start Page
let startPageImage;
let scalar = 2;
let state = "start";
let treesImg;

function preload() {
  startPageImage = loadImage("startPageBackground.jpg");
  treesImg = loadImage("fall-trees.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
}

function draw() {
  background(220);
  image(startPageImage, windowWidth/2, windowHeight/4, startPageImage.width * scalar, startPageImage.height * 2);
  if (state === "start") {
    startScreen();
  }
  if (state === "main") {
    image(treesImg, 0, 0, width, height);
  }
}

function mousePressed() {
  if (state === "start" && mouseInsideRect(400, 700, 400, 550)) {
    state = "main";
  } 
}

function startScreen() {
  if (mouseInsideRect(400, 700, 400, 550)) {
    fill("gray");
  }
  else {
    fill("black");
  }
  rect(400, 400, 300, 150);
  fill("white");
  textSize(50);
  text("Begin!", 480, 490);
}

function mouseInsideRect(left, right, top, bottom) {
  return mouseX >= left && mouseX <= right &&
         mouseY >= top && mouseY <= bottom;
}