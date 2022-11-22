// Tic Tac Toe
// Nini Li
// 11/22/2022

//global variables
let tileSize = 133; 
let tileRows = []; 
let currentPlayer = "X"; 

//setup
function setup() {
  createCanvas(400, 400);
  setupTiles();
}

function setupTiles() {
  for (let row = 0; row < 3; row++) {
    tileRows[row] = [];
    for (let col = 0; col < 3; col++) {
      tileRows[row][col] = new Tile(col, row);
    }
  }
}

//reset
function keyPressed() {
  resetGame();
}

function resetGame() {
  createCanvas(400, 400);
  setupTiles();
}

//draw
function draw() {
  background(255, 232, 214);
  drawGrid();
  drawTiles();
  showTurn();
}

//game board
function drawGrid() {
  noFill();
  stroke(0);
  for (let row = 0; row < 3; row++) {
    line(0, row * tileSize, tileSize * 3, row * tileSize);
  }
  for (let col = 0; col < 3; col++) {
    line(col * tileSize, 0, col * tileSize, tileSize * 3);
  }

}
function drawTiles() { 
  //tiles
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      tileRows[row][col].show();
    }
  }
}

//who's turn is it?
function showTurn(){
  noStroke();
  fill(100, 0, 0);
  text( "Turn: " + currentPlayer, 10, 20);
}

function switchPlayer() { 
  //change turns
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } 
  else {
    currentPlayer = "X";
  }
}

//when mouse is clicked
function mouseClicked() {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      ifEmpty(tileRows[row][col]);
    }
  }
}

function ifEmpty(currentTile) { 
  //check if tile empty
  if (currentTile.isMouseInBounds() && currentTile.isEmpty()) {
    currentTile.change(currentPlayer);
    switchPlayer();
  }
}

//making each tile an actual object
class Tile {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.theTurn = " ";
  }

  change(theTurn) {
    //ensures that the letter on the tile is correct
    if (theTurn === "X") {
      this.theTurn = "X";
    } 
    else if (theTurn === "O") {
      this.theTurn = "O";
    }
  }

  isEmpty() {
    if (this.theTurn === " ") {
      //if empty
      return true;
    } 
    else {
      //if not then error
      alert("Must place on empty tile");//found alert outside of p5js references
      //thankful that the pop up actually works
      return false;
    }
  }

  //checking if mouse is inside the tile
  isMouseInBounds() {
    let dx = this.x * tileSize;
    let dy = this.y * tileSize;
    if (mouseX > dx &&
      mouseX < dx + tileSize &&
      mouseY > dy &&
      mouseY < dy + tileSize) {
      return true;
    }
    return false;
  }

  //show the tile
  show() {
    let dx = this.x * tileSize;
    let dy = this.y * tileSize;
    if (this.isMouseInBounds()) {
      fill(150);
      rect(dx, dy, tileSize, tileSize);
    }

    //display text
    fill(0);
    push();
    translate(tileSize/2, tileSize/2); //still struggling with centering the entire thing, so i just did the text alone
    text(this.theTurn, dx, dy);
    pop();
  }
}