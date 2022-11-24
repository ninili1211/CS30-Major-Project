const cols = 8;
const rows = 8;
const board = Array(rows).fill().map(() => Array(cols).fill(0));

const w = 60;
const dw = 48;

const SELECT_STATE = 0;
const MOVE_STATE = 1;
let state = SELECT_STATE;

let selectedI = -1;
let selectedJ = -1;

const BLUE = 1;
const RED = 2;
const WHITE = 1;
const BLACK = 2;
let player = BLUE;

function setup() {
  createCanvas(cols*w, rows*w);
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < cols; i++) {
      if (i % 2 !== j % 2) {
        board[j][i] = 2;
      }
    }
  }
  
  for (let j = rows-3; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      if (i % 2 !== j % 2) {
        board[j][i] = 1;
      }
    }
  }
}

function draw() {
  background(220);
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      noStroke();
      fill(51);
      if (i % 2 === j % 2) {
        fill(204);
      }
      rect(i*w, j*w, w, w);
      
      if (board[j][i] > 0) {
        if (board[j][i] === 1) {
          fill(0, 0, 255);
        } 
        else if (board[j][i] === 2) {
          fill(255, 0, 0);
        }
        if (i === selectedI && j === selectedJ) {
          stroke(255, 255, 0);
        }
        circle(i*w + w/2, j*w + w/2, dw);
      }
    }
  }
}

function mousePressed() {
  const i = floor(mouseX / w);
  const j = floor(mouseY / w);
  if (state === SELECT_STATE) {
    if (board[j][i] === player) {
      selectedI = i;
      selectedJ = j;
    }
    state = MOVE_STATE;
  } 
  else if (state === MOVE_STATE) {
    if (board[j][i] === player) {
      selectedI = i;
      selectedJ = j;
    } 
    else if (board[j][i] === 0) {
      if (player === 1) {
        if ((i === selectedI-1 || i === selectedI+1) && j === selectedJ-1) {
          board[j][i] = player;
          board[selectedJ][selectedI] = 0;
          player = 2;
          state = SELECT_STATE;
        }
      } 
      else if (player === 2) {
        if ((i === selectedI-1 || i === selectedI+1) && j === selectedJ+1) {
          board[j][i] = player;
          board[selectedJ][selectedI] = 0;
          player = 1;
          state = SELECT_STATE;
        }
      }
    }
  }
}