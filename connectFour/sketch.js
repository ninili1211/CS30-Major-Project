//Connect Four
let grid = [[0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0]];

let state = "red";

function setup() {
  createCanvas(windowWidth, windowHeight);
}


function draw() {
  displayGrid(grid);
}

function mousePressed() {
  console.log(mouseX, mouseY);
  let cellWidth = 100;
  let cellHeight = 100;

  let x = Math.floor(mouseX/cellWidth);
  let y = Math.floor(mouseY/cellHeight);

  if (state === "red") {
    if (grid[y][x] === 0) {
      grid[y][x] = 1;
    }
  }
  
  if (state === "yellow") {
    if (grid[y][x] === 0) {
      grid[y][x] = 2;
    }
  }
}

function displayGrid(grid) {
  let cellWidth = 100;
  let cellHeight = 100;
  for (let y=0; y<grid.length; y++) {
    for (let x=0; x<grid[y].length; x++) {
      // if (grid[y][x] === 0) {
      fill("#a2d2ff");
      // }
      // else if (grid[y][x] === 1) {
      //   fill("red");
      // }
      // else if (grid[y][x] === 2) {
      //   fill("yellow");
      // }
      rect(x*cellWidth, y*cellHeight, cellWidth, cellHeight);
    }
  }
  for (let y=0; y<grid.length; y++) {
    for (let x=0; x<grid[y].length; x++) {
      if (grid[y][x] === 1) {
        fill("#fc7a57");
        circle(x*cellWidth, y*cellHeight, cellWidth, cellHeight);
      }
      else if (grid[y][x] === 2) {
        fill("#eefc57");
      }
    }
  }
}