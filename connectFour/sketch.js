const cols = 7;
const rows = 6;
const w = 100;
const dw = 80;
const board = Array(6).fill().map(() => Array(7).fill(0));

let player = 1;
let playerPos;
const stack = [];
let win = 0;

let player2Select;
const player2Config = {
  'Too Easy': {
    levels: 2,
    startStupid: 2,
    stupidProb: 0.9
  },
  'Easy': {
    levels: 2,
    startStupid: 4,
    stupidProb: 0.7
  },
  'Medium': {
    levels: 2,
    startStupid: 10,
    stupidProb: 0.2
  },
  'Hard': {
    levels: 2,
    startStupid: 1000,
    stupidProb: 0.0
  },
  'Ouch': {
    levels: 4,
    startStupid: 1000,
    stupidProb: 0.0
  }
};
let moves = 0;

function setup() {
  const canvas = createCanvas(cols*w, rows*w + w);
  canvas.mousePressed(drop);
  
  player2Select = select("#player2");
}

function hasWon() {
  // Test Horizontal
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i <= cols-4; i++) {
      const test = board[j][i];
      if (test != 0) {
        let temp = true;
        for (let k = 0; k < 4; k++) {
          if (board[j][i+k] !== test) {
            temp = false;
          }
        }
        if (temp == true) {
          return true;
        }
      }
    }
  }
  
  // Test Vertical
  for (let j = 0; j <= rows-4; j++) {
    for (let i = 0; i < cols; i++) {
      const test = board[j][i];
      if (test != 0) {
        let temp = true;
        for (let k = 0; k < 4; k++) {
          if (board[j+k][i] !== test) {
            temp = false;
          }
        }
        if (temp == true) {
          return true;
        }
      }
    }
  }
  
  // Test Diagonal
  for (let j = 0; j <= rows-4; j++) {
    for (let i = 0; i <= cols-4; i++) {
      const test = board[j][i];
      if (test != 0) {
        let temp = true;
        for (let k = 0; k < 4; k++) {
          if (board[j+k][i+k] !== test) {
            temp = false;
          }
        }
        if (temp == true) {
          return true;
        }
      }
    }
  }
  
  // Test Antidiagonal
  for (let j = 0; j <= rows-4; j++) {
    for (let i = 4; i < cols; i++) {
      const test = board[j][i];
      if (test != 0) {
        let temp = true;
        for (let k = 0; k < 4; k++) {
          if (board[j+k][i-k] !== test) {
            temp = false;
          }
        }
        if (temp == true) {
          return true;
        }
      }
    }
  }
  
  return false;
}

function draw() {
  background(255, 255, 0);
  
  if (player <= 1 || player2Select.value() === 'Human') {
    playerPos = floor(mouseX/w);
  }
  
  stroke(0);
  fill(255);
  rect(-1, -1, width+2, w);
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      fill(255);
      if (board[j][i] == 1) {
        fill(0, 0, 255);
      } else if (board[j][i] == 2) {
        fill(255, 0, 0);
      }
      ellipse(i*w + w/2, j*w + 3*w/2, dw);
    }
  }
  
  stroke(102, 102, 0);
  for (let x = w; x < width; x += w) {
    line(x, w, x, height);
  }
  
  stroke(0);
  if (player == 1) {
    fill(0, 0, 255);
  } else if (player  == 2) {
    fill(255, 0, 0);
  }
  ellipse((playerPos + 0.5) * w, w/2, dw);
  
  if (win != 0) {
    noStroke();
    fill(0);
    if (win == 1) {
      fill(0, 0, 255);
    } else if (win  == 2) {
      fill(255, 0, 0);
    }
    textAlign(CENTER, CENTER);
    textSize(64);
    if (win == 4) {
      text("Game Over!", width/2, w/2);
    } else if (win == 3) {
      text("It is a tie.", width/2, w/2);
    } else {
      text(`${win > 1 ? 'Red' : 'Blue'} won!`, width/2, w/2);
    }
    noLoop();
  }
}

function dropAlgorithm() {
  board[0][playerPos] = player;
  stack.push(playerPos);
  let i = 0;
  while (true) {
    if (i >= rows-1) {
      break;
    }
    if (board[i+1][playerPos] != 0) {
      break;
    }
    [board[i+1][playerPos], board[i][playerPos]] = [board[i][playerPos], board[i+1][playerPos]];
    i++;
  }
}

function undo() {
  playerPos = stack.pop();
  let i = 0;
  while (true) {
    if (i >= rows) {
      break;
    }
    if (board[i][playerPos] != 0) {
      board[i][playeros] = 0;
      break;
    }
    i++;
  }
}

function drop() {
  if (board[0][playerPos] != 0) {
    win = 4;
  }
  
  dropAlgorithm();
  
  if (hasWon()) {
    //console.log(`${player > 1 ? 'Red' : 'Blue'} won!`);
    win = player;
  }
  
  let tie = true;
  for (let j = 0; j < rows; j++) {outer: {
    for (let i = 0; i < cols; i++) {
      if (board[j][i] == 0) {
        tie = false;
      }
    }
  }}
  
  if (tie) {
    win = 3;
  }
  
  player = 3 - player;
  
  let player2 = player2Select.value();
  const regex = /\(([\w ]+)\)/;
  player2 = regex.exec(player2)[1];
  const player2Prop = player2Config[player2];
  if (player2 !== 'Human') {
    let bestMove = calcBestMove(board, player2Prop.levels, true);
    if (moves >= player2Prop.startStupid && random(1) < player2Prop.stupidProb) {
      bestMove = floor(random(7));
    }
    playerPos = bestMove;
    dropAlgorithm();
  }
  moves++;
  
  player = 3 - player;
}

function freeCols(j) {
  const available = [0, 1, 2, 3, 4, 5, 6];
  for (let i = cols-1; i >= 0; i--) {
    if (board[j][available[i]] != 0) {
      available.splice(i, 1);
    }
  }
  return available;
}

function calcBestMove(board, depth, maximizingPlayer) {
  const moves = freeCols();
  let bestMove = -Infinity;
  let bestMoveFound = moves[0];
  
  for (const move of moves) {
    playerPos = move;
    dropAlgorithm();
    const value = minimax(board, depth-1, !maximizingPlayer);
    undo();
    if (value > bestMove) {
      bestMove = value;
      bestMoveFound = move;
    }
  }
  
  return bestMoveFound;
}

function minimax(board, depth, maximizingPlayer) {
  if (depth <= 0) {
    return evaluateBoard(board);
  }
  
  const moves = freeCols();
  if (maximizingPlayer) {
    let bestMove = -Infinity;
    for (const move of moves) {
      playerPos = move;
      dropAlgorithm();
      bestMove = max(bestMove, minimax(board, depth-1, false));
      undo();
    }
    return bestMove;
  } else { // minimizing player
    let bestMove = +Infinity;
    for (const move of moves) {
      playerPos = move;
      dropAlgorithm();
      bestMove = min(bestMove, minimax(board, depth-1, true));
      undo();
    }
    return bestMove;
  }
}

function maxLine(i, j) {
  let res = 0;
  if (board[j][i] != 0) {
    res = 1;
    for (let joff = -1; joff <= 1; joff++) {
      for (let ioff = -1; ioff <= 1; ioff++) {
        if (ioff != 0 && joff != 0) {
          const ni = i + ioff;
          const nj = j + joff;
          // eslint-disable-next-line no-empty
          if (ni > -1 && ni < cols && nj > -1 && nj < rows) {
            
          }
        }
      }
    }
  }
}

function evaluateBoard(board) {
  let sum = 0;
  
}