//no kills or html yet

//variables 
const COLS = 8;
const ROWS = 8;
const board = Array(ROWS).fill().map(() => Array(COLS).fill(0));
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

//setup
function setup() {
  createCanvas(COLS*w, ROWS*w);
  pieces();
}

function draw() {
  background(220);
  for (let j = 0; j < ROWS; j++) {
    for (let i = 0; i < COLS; i++) {
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

function pieces() {
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < COLS; i++) {
      if (i % 2 !== j % 2) {
        board[j][i] = 2;
      }
    }
  }
  
  for (let j = ROWS-3; j < ROWS; j++) {
    for (let i = 0; i < COLS; i++) {
      if (i % 2 !== j % 2) {
        board[j][i] = 1;
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