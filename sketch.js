// Mini-Game Collection (CS30 Major Project)
// Nini Li
// 11/22/2022

// //Start Page
let state = "start";
let startBackImg;
let optionBackImg;
let startButtonImg;
let startButtonHoverImg;
let cursorImg;

function preload() {
  startBackImg = loadImage("startPageBackground.jpg");
  optionBackImg = loadImage("optionsBackground.jpg");
  startButtonImg = loadImage("startButton.png");
  startButtonHoverImg = loadImage("startButtonHover.png");
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
}

function startScreen() {
  imageMode(CORNER);
  image(startBackImg, 0, 0, width, height);
  image(startButtonImg, windowWidth * 0.33, windowHeight * 0.75, width * 0.35, height * 0.2);
}

function startState() {
  if (state === "start") {
    startScreen();
  }
  if (state === "main") {
    image(optionBackImg, 0, 0, width, height);
  }
}

// function mouseTouching() {
//     if (mouseX && mouseY === ) {
//         image(startButtonImg,)
//     }
// }

// //tic tac toe
// // Tic Tac Toe
// // Nini Li
// // 11/22/2022

// //global variables
// let tileSize = 133; 
// let tileRows = []; 
// let currentPlayer = "X"; 

// //setup
// function setup() {
//   createCanvas(400, 400);
//   setupTiles();
// }

// function setupTiles() {
//   for (let row = 0; row < 3; row++) {
//     tileRows[row] = [];
//     for (let col = 0; col < 3; col++) {
//       tileRows[row][col] = new Tile(col, row);
//     }
//   }
// }

// //reset
// function keyPressed() {
//   resetGame();
// }

// function resetGame() {
//   createCanvas(400, 400);
//   setupTiles();
// }

// //draw
// function draw() {
//   background(255, 232, 214);
//   drawGrid();
//   drawTiles();
//   showTurn();
// }

// //game board
// function drawGrid() {
//   noFill();
//   stroke(0);
//   for (let row = 0; row < 3; row++) {
//     line(0, row * tileSize, tileSize * 3, row * tileSize);
//   }
//   for (let col = 0; col < 3; col++) {
//     line(col * tileSize, 0, col * tileSize, tileSize * 3);
//   }

// }
// function drawTiles() { 
//   //tiles
//   for (let row = 0; row < 3; row++) {
//     for (let col = 0; col < 3; col++) {
//       tileRows[row][col].show();
//     }
//   }
// }

// //who's turn is it?
// function showTurn(){
//   noStroke();
//   fill(100, 0, 0);
//   text( "Turn: " + currentPlayer, 10, 20);
// }

// function switchPlayer() { 
//   //change turns
//   if (currentPlayer === "X") {
//     currentPlayer = "O";
//   } 
//   else {
//     currentPlayer = "X";
//   }
// }

// //when mouse is clicked
// function mouseClicked() {
//   for (let row = 0; row < 3; row++) {
//     for (let col = 0; col < 3; col++) {
//       ifEmpty(tileRows[row][col]);
//     }
//   }
// }

// function ifEmpty(currentTile) { 
//   //check if tile empty
//   if (currentTile.isMouseInBounds() && currentTile.isEmpty()) {
//     currentTile.change(currentPlayer);
//     switchPlayer();
//   }
// }

// //making each tile an actual object
// class Tile {
//   constructor(x, y) {
//     this.x = x;
//     this.y = y;
//     this.theTurn = " ";
//   }

//   change(theTurn) {
//     //ensures that the letter on the tile is correct
//     if (theTurn === "X") {
//       this.theTurn = "X";
//     } 
//     else if (theTurn === "O") {
//       this.theTurn = "O";
//     }
//   }

//   isEmpty() {
//     if (this.theTurn === " ") {
//       //if empty
//       return true;
//     } 
//     else {
//       //if not then error
//       alert("Must place on empty tile");//found alert outside of p5js references
//       //thankful that the pop up actually works
//       return false;
//     }
//   }

//   //checking if mouse is inside the tile
//   isMouseInBounds() {
//     let dx = this.x * tileSize;
//     let dy = this.y * tileSize;
//     if (mouseX > dx &&
//       mouseX < dx + tileSize &&
//       mouseY > dy &&
//       mouseY < dy + tileSize) {
//       return true;
//     }
//     return false;
//   }

//   //show the tile
//   show() {
//     let dx = this.x * tileSize;
//     let dy = this.y * tileSize;
//     if (this.isMouseInBounds()) {
//       fill(150);
//       rect(dx, dy, tileSize, tileSize);
//     }

//     //display text
//     fill(0);
//     push();
//     translate(tileSize/2, tileSize/2); //still struggling with centering the entire thing, so i just did the text alone
//     text(this.theTurn, dx, dy);
//     pop();
//   }
// }
// //Connect Four
// let grid = [[0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0]];

// let state = "red";

// function setup() {
//   createCanvas(windowWidth, windowHeight);
// }


// function draw() {
//   displayGrid(grid);
// }

// function mousePressed() {
//   console.log(mouseX, mouseY);
//   let cellWidth = 100;
//   let cellHeight = 100;

//   let x = Math.floor(mouseX/cellWidth);
//   let y = Math.floor(mouseY/cellHeight);

//   if (state === "red") {
//     if (grid[y][x] === 0) {
//       grid[y][x] = 1;
//     }
//   }
  
//   if (state === "yellow") {
//     if (grid[y][x] === 0) {
//       grid[y][x] = 2;
//     }
//   }
// }

// function displayGrid(grid) {
//   let cellWidth = 100;
//   let cellHeight = 100;
//   for (let y=0; y<grid.length; y++) {
//     for (let x=0; x<grid[y].length; x++) {
//       // if (grid[y][x] === 0) {
//       fill("#a2d2ff");
//       // }
//       // else if (grid[y][x] === 1) {
//       //   fill("red");
//       // }
//       // else if (grid[y][x] === 2) {
//       //   fill("yellow");
//       // }
//       rect(x*cellWidth, y*cellHeight, cellWidth, cellHeight);
//     }
//   }
//   for (let y=0; y<grid.length; y++) {
//     for (let x=0; x<grid[y].length; x++) {
//       if (grid[y][x] === 1) {
//         fill("#fc7a57");
//         circle(x*cellWidth, y*cellHeight, cellWidth, cellHeight);
//       }
//       else if (grid[y][x] === 2) {
//         fill("#eefc57");
//       }
//     }
//   }
// }