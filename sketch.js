// Mini-Game Collection (CS30 Major Project)
// Nini Li
// 11/22/2022

//Start Page
let startPageImage;
let scalar = 2;

function preload() {
  startPageImage = loadImage("startPageBackground.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
}

function draw() {
  background(220);
  image(startPageImage, windowWidth/2, windowHeight/4, startPageImage.width * scalar, startPageImage.height * 2);
}