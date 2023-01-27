//could not get images to transfer into file for some reason, so this code doesn't work. 

// Variables
let canvas;
let COLS;
let ROWS;
let grid;
let scale = 100;
let imgB = [];
let imgW = [];
let pieces = [];
let moves = [];
let currentPiece;
let restartButton;

//setup
function setup(){
  canvas = createCanvas(800, 800);
  canvas.position((windowWidth/2) - width/2, 30);
  createDomElements();
  COLS = floor(width/scale);
  ROWS = floor(height/scale);
  make2DArray(COLS, ROWS);
  init2DArray();
  setStartPos();
  createPieces();
}

//draw
function draw(){
  colourizeCells();
  renderPieces();
  highlights();

}

//preloaded images
function preload() {
    imgB[0] = loadImage("https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Chess_pdt45.svg/45px-Chess_pdt45.svg.png");
    imgB[1] = loadImage("https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Chess_rdt45.svg/45px-Chess_rdt45.svg.png");
    imgB[2] = loadImage("https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Chess_ndt45.svg/45px-Chess_ndt45.svg.png");
    imgB[3] = loadImage("https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Chess_bdt45.svg/45px-Chess_bdt45.svg.png");
    imgB[4] = loadImage("https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Chess_qdt45.svg/45px-Chess_qdt45.svg.png");
    imgB[5] = loadImage("https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Chess_kdt45.svg/45px-Chess_kdt45.svg.png");
    imgW[0] = loadImage("https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Chess_plt45.svg/45px-Chess_plt45.svg.png");
    imgW[1] = loadImage("https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Chess_rlt45.svg/45px-Chess_rlt45.svg.png");
    imgW[2] = loadImage("https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Chess_nlt45.svg/45px-Chess_nlt45.svg.png");
    imgW[3] = loadImage("https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Chess_blt45.svg/45px-Chess_blt45.svg.png");
    imgW[4] = loadImage("https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Chess_qlt45.svg/45px-Chess_qlt45.svg.png");
    imgW[5] = loadImage("https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Chess_klt45.svg/45px-Chess_klt45.svg.png");
}

//pawn
class PawnW extends PawnB {
    constructor(i, j, img){
      super(i, j, img);
      this.color = true;
    }
    highlight(){
      let jm1 = constrain(this.j - 1 ,0,grid.length - 1);
      let jm2 = constrain(this.j - 2 ,0,grid.length -1 );
      if (this.firstClick && this.firstMove){
        grid[this.i][jm1].toHighlight = true;
        grid[this.i][jm2].toHighlight = true;
      } else if (!this.firstClick && this.firstMove){
        grid[this.i][jm1].toHighlight = false;
        grid[this.i][jm2].toHighlight = false;
      } else if (this.firstClick && !this.firstMove){
        grid[this.i][jm1].toHighlight = true;
        grid[this.i][jm2].toHighlight = false;
      } else if (!this.firstClick && !this.firstMove){
        grid[this.i][jm1].toHighlight = false;
        grid[this.i][jm2].toHighlight = false;
      }
    }
  }

//white rook
class RookW extends RookB {
  constructor(i, j, img){
    super(i, j, img);
    this.color = true;
  }
}

//white knight
class KnightW extends KnightB {
  constructor(i, j, img){
    super(i, j, img);
    this.color = true;
  }
}

//white bishop
class BishopW extends BishopB {
  constructor(i, j, img){
    super(i, j, img);
    this.color = true;
  }
}

//white queen
class QueenW extends QueenB {
  constructor(i, j, img){
    super(i, j, img);
    this.color = true;
  }
}

//white king
class KingW extends KingB {
  constructor(i, j, img){
    super(i, j, img);
    this.color = true;
  }
}

//black pawn
class PawnB {
    constructor(i, j, img){
      this.i = i;
      this.j = j;
      this.color = false;
      this.x = i * scale;
      this.y = j * cale;
      this.img = img;
      this.firstClick = false;
      this.firstMove = true;
    }
    show(){
      imageMode(CENTER);
      image(this.img, this.x, this.y);
    }
    update(){
      this.x = this.i * scale + 50;
      this.y = this.j * scale + 50;
    }
  
    //sensor
    clickedOn(){
      let edgeX = this.x - 50;
      let edgeY = this.y - 50;
      if (mouseX > edgeX && mouseX < edgeX + scale && mouseY > edgeY && mouseY < edgeY + scale && !this.firstClick){
        this.firstClick = true;
      } else if (mouseX > edgeX && mouseX < edgeX + scale && mouseY > edgeY && mouseY < edgeY + scale && this.firstClick){
        this.firstClick = false;
      }  
    }
  
    //next move
    highlight(){
      let jp1 = constrain(this.j+1, 0, grid.length - 1);
      let jp2 = constrain(this.j+2, 0, grid.length - 1);
      if (this.firstClick && this.firstMove){
        grid[this.i][jp1].toHighlight = true;
        grid[this.i][jp2].toHighlight = true;
      } else if (!this.firstClick && this.firstMove){
        grid[this.i][jp1].toHighlight = false;
        grid[this.i][jp2].toHighlight = false;
      } else if (this.firstClick && !this.firstMove){
        grid[this.i][jp1].toHighlight = true;
        grid[this.i][jp2].toHighlight = false;
      } else if (!this.firstClick && !this.firstMove){
        grid[this.i][jp1].toHighlight = false;
        grid[this.i][jp2].toHighlight = false;
      }
      for (let i1 = 0; i1 < grid.length; i1++){
        for (let i2 = 0; i2 < grid[i1].length; i2++){
          if (containsNot(moves, grid[i1][i2]) && grid[i1][i2].toHighlight){
            moves.push(grid[i1][i2]);
          }
        }
      }
    }
  
    //move
    move(){
      for (let i = 0; i < pieces.length; i++){
        if (pieces[i].firstClick){
          currentPiece = pieces[i];
        }
      }
      for (let i = 0; i < moves.length; i++){
        let distance = dist(mouseX, mouseY, moves[i].i*scale, moves[i].j*scale);
        if (distance < 100){
          currentPiece.i = moves[i].i;
          currentPiece.j = moves[i].j;
          currentPiece.firstMove = false;
          currentPiece.firstClick = false;
          unsetHighlights();
          moves.length = null;
          currentPiece = null;
        }
      }
    }
  
    //caught
    captured(){
      for (var i = 0; i < pieces.length; i++){
        if (this.i === pieces[i].i && this.j === pieces[i].j){
          pieces.splice(i, 1);
        }
      }
    }
  }
  
  class RookB extends PawnB {
    constructor(i,j, img){
      super(i,j,img);
    }
    highlight(){
      let ip1 = constrain(this.i +1 ,0,grid.length-1);
      let ip2 = constrain(this.i +2 ,0,grid.length-1);
      let ip3 = constrain(this.i +3 , 0, grid.length-1);
      let ip4 = constrain(this.i +4 , 0, grid.length-1);
      let ip5 = constrain(this.i +5 , 0, grid.length-1);
      let ip6 = constrain(this.i +6 , 0, grid.length-1);
      let ip7 = constrain(this.i +7 , 0, grid.length-1);
      let im1 = constrain(this.i -1 , 0, grid.length-1);
      let im2 = constrain(this.i -2 , 0, grid.length-1);
      let im3 = constrain(this.i -3 , 0, grid.length-1);
      let im4 = constrain(this.i -4 , 0, grid.length-1);
      let im5 = constrain(this.i - 5 ,0, grid.length-1);
      let im6 = constrain(this.i - 6 ,0, grid.length-1);
      let im7 = constrain(this.i -7 , 0, grid.length-1);
      let jp1 = constrain(this.j +1 , 0, grid.length-1);
      let jp2 = constrain(this.j +2 , 0, grid.length-1);
      let jp3 = constrain(this.j +3 , 0, grid.length-1);
      let jp4 = constrain(this.j +4 , 0, grid.length-1);
      let jp5 = constrain(this.j +5 , 0, grid.length-1);
      let jp6 = constrain(this.j +6 , 0, grid.length-1);
      let jp7 = constrain(this.j +7 , 0, grid.length-1);
      let jm1 = constrain(this.j -1 , 0, grid.length-1);
      let jm2 = constrain(this.j -2 , 0, grid.length-1);
      let jm3 = constrain(this.j -3 , 0, grid.length-1);
      let jm4 = constrain(this.j -4 , 0, grid.length-1);
      let jm5 = constrain(this.j -5 , 0, grid.length-1);
      let jm6 = constrain(this.j -6 , 0, grid.length-1);
      let jm7 = constrain(this.j -7 , 0, grid.length-1);
      if (this.firstClick){
        grid[this.i][jp1].toHighlight = true;
        grid[this.i][jp2].toHighlight = true;
        grid[this.i][jp3].toHighlight = true;
        grid[this.i][jp4].toHighlight = true;
        grid[this.i][jp5].toHighlight = true;
        grid[this.i][jp6].toHighlight = true;
        grid[this.i][jp7].toHighlight = true;
        grid[this.i][jm1].toHighlight = true;
        grid[this.i][jm2].toHighlight = true;
        grid[this.i][jm3].toHighlight = true;
        grid[this.i][jm4].toHighlight = true;
        grid[this.i][jm5].toHighlight = true;
        grid[this.i][jm6].toHighlight = true;
        grid[this.i][jm7].toHighlight = true;
        grid[ip1][this.j].toHighlight = true;
        grid[ip2][this.j].toHighlight = true;
        grid[ip3][this.j].toHighlight = true;
        grid[ip4][this.j].toHighlight = true;
        grid[ip5][this.j].toHighlight = true;
        grid[ip6][this.j].toHighlight = true;
        grid[ip7][this.j].toHighlight = true;
        grid[im1][this.j].toHighlight = true;
        grid[im2][this.j].toHighlight = true;
        grid[im3][this.j].toHighlight = true;
        grid[im4][this.j].toHighlight = true;
        grid[im5][this.j].toHighlight = true;
        grid[im6][this.j].toHighlight = true;
        grid[im7][this.j].toHighlight = true;
      } 
      else if (!this.firstClick){
        grid[this.i][jp1].toHighlight = false;
        grid[this.i][jp2].toHighlight = false;
        grid[this.i][jp3].toHighlight = false;
        grid[this.i][jp4].toHighlight = false;
        grid[this.i][jp5].toHighlight = false;
        grid[this.i][jp6].toHighlight = false;
        grid[this.i][jp7].toHighlight = false;
        grid[this.i][jm1].toHighlight = false;
        grid[this.i][jm2].toHighlight = false;
        grid[this.i][jm3].toHighlight = false;
        grid[this.i][jm4].toHighlight = false;
        grid[this.i][jm5].toHighlight = false;
        grid[this.i][jm6].toHighlight = false;
        grid[this.i][jm7].toHighlight = false;
        grid[ip1][this.j].toHighlight = false;
        grid[ip2][this.j].toHighlight = false;
        grid[ip3][this.j].toHighlight = false;
        grid[ip4][this.j].toHighlight = false;
        grid[ip5][this.j].toHighlight = false;
        grid[ip6][this.j].toHighlight = false;
        grid[ip7][this.j].toHighlight = false;
        grid[im1][this.j].toHighlight = false;
        grid[im2][this.j].toHighlight = false;
        grid[im3][this.j].toHighlight = false;
        grid[im4][this.j].toHighlight = false;
        grid[im5][this.j].toHighlight = false;
        grid[im6][this.j].toHighlight = false;
        grid[im7][this.j].toHighlight = false;
      }
      for (let i1 = 0; i1 < grid.length; i1++){
        for (let i2 = 0; i2 < grid[i1].length; i2++){
          if (containsNot(moves, grid[i1][i2]) && grid[i1][i2].toHighlight){
            moves.push(grid[i1][i2]);
          }
        }
      }
    }
  }


  class KnightB extends PawnB {
  
    constructor(i,j, img){
  
      super(i,j,img);
  
    }
  
    highlight(){
  
      let ip1 = constrain(this.i + 1, 0, grid.length-1);
      let ip2 = constrain(this.i + 2, 0, grid.length-1);
      let im1 = constrain(this.i - 1, 0, grid.length-1);
      let im2 = constrain(this.i - 2, 0, grid.length-1);
      let jp1 = constrain(this.j + 1, 0, grid.length-1);
      let jp2 = constrain(this.j + 2, 0, grid.length-1);
      let jm1 = constrain(this.j - 1, 0, grid.length-1);
      let jm2 = constrain(this.j - 2, 0, grid.length-1);
  
      if (this.firstClick){
  
        grid[im1][jm2].toHighlight = true;
        grid[ip1][jm2].toHighlight = true;
        grid[im1][jp2].toHighlight = true;
        grid[ip1][jp2].toHighlight = true;
        grid[im2][jm1].toHighlight = true;
        grid[im2][jp1].toHighlight = true;
        grid[ip2][jm1].toHighlight = true;
        grid[ip2][jp1].toHighlight = true;
  
      } else if (!this.firstClick){
  
        grid[im1][jm2].toHighlight = false;
        grid[ip1][jm2].toHighlight = false;
        grid[im1][jp2].toHighlight = false;
        grid[ip2][jp2].toHighlight = false;
        grid[ip2][jm1].toHighlight = false;
        grid[ip2][jp1].toHighlight = false;
        grid[ip1][jm1].toHighlight = false;
        grid[ip1][jp1].toHighlight = false;
  
      }
  
      for (let i1 = 0; i1 < grid.length; i1++){
        for (let i2 = 0; i2 < grid[i1].length; i2++){
          if (containsNot(moves, grid[i1][i2]) && grid[i1][i2].toHighlight){
            moves.push(grid[i1][i2]);
          }
        }
      }
  
    }
  
  
  }
  
  class BishopB extends PawnB {
    constructor(i, j, img){
      super(i, j, img);
    }
  }
  
  class QueenB extends PawnB {
    constructor(i,j, img){
      super(i, j, img);
    }
  }
  
  class KingB extends PawnB {
    constructor(i, j, img){
      super(i, j, img);
    }
  
  }

  //individual cells
  class Cells {
    constructor(i, j){
      this.i = i;
      this.j = j;
      this.x = i * scale;
      this.y = j * scale;
      this.pawnB = false;
      this.rookB = false;
      this.knightB = false;
      this.bishopB = false;
      this.queenB = false;
      this.kingB = false;
      this.pawnW = false;
      this.rookW = false;
      this.knightW = false;
      this.bishopW = false;
      this.queenW = false;
      this.kingW = false;
      this.toHighlight = false;
    }
  
    //game patterns
    showPattern1(){
      fill(255,212,128);
      noStroke();
      rect(this.x, this.y, scale, scale)
    }
  
    showPattern2(){
      fill(204,136,0);
      noStroke();
      rect(this.x, this.y, scale, scale)
    }
  
    highlight(){
      if(this.toHighlight){
        fill(0, 255, 0, 127);
        noStroke();
        rect(this.x, this.y, scale, scale)
      }
    }
  }

  function make2DArray(COLS,ROWS){
    grid = new Array(COLS);
      for (let i = 0; i < grid.length; i++){
        grid[i] = new Array(ROWS);
      }
  }
  
  function init2DArray(){
    let maxcolumn = grid.length;
    for(_columns = 0; _columns < maxcolumn; _columns++){
      maxROWS = grid[_columns].length;
      for(_ROWS = 0; _ROWS < maxROWS; _ROWS++){
        grid[_columns][_ROWS] = new Cells(_columns,_ROWS);
      }
    }
  
  }
  
  function containsNot(array, object) {
      for (let i = 0; i < array.length; i++) {
        if (array[i] === object) {
          return false;
        }
      }
      return true;
  }
  
  function mouseClicked(){
    for (let i = 0; i < pieces.length; i++){
      pieces[i].clickedOn();
      pieces[i].update();
      pieces[i].move();
    }
  }

  function windowResized(){
    resetPositions();
  }
  
  function resetPositions(){
    canvas.position((windowWidth/2)-width/2,30);
    restartButton.position((windowWidth/2)-width/2,840);
  }
  
  //colour cells
  function colourizeCells(){
    let firstBlack;
    let Modulo = 2;
    grid.forEach(function(_columns,_columni){
      if(_columni % Modulo === 0){
        firstBlack = true;
      } 
      else {
        firstBlack = false;
      }
      _columns.forEach(function(_ROWS, _i){
        if(firstBlack){
          if(_i % Modulo === 0){
            _ROWS.showPattern2();
          }  
          else {
            _ROWS.showPattern1()
          }
  
        } 
        else {
          if(_i % Modulo === 0){
            _ROWS.showPattern1();
          }  
          else {
            _ROWS.showPattern2()
          }
  
        }
  
      })
    })
  
  }
  
  function highlights(){
    for (let i = 0; i < moves.length; i++){
      moves[i].highlight();
    }
  }
  
  function unsetHighlights(){
    for (let i1 = 0; i1 < grid.length; i1++){
      for (let i2 = 0; i2 < grid[i1].length; i2++){
        grid[i1][i2].toHighlight = false;
      }
    }
  }
  
  function renderPieces(){
    for (let i = 0; i < pieces.length; i++){
      pieces[i].update();
      pieces[i].show();
      pieces[i].highlight();
    }
  }
  
  function restartGame(){
    pieces.length = null;
    setStartPos();
    createPieces();
  }
  
  function createDomElements(){
  
    restartButton = createButton("Start New Game");
    restartButton.mousePressed(restartGame);
    restartButton.position((windowWidth/2)-width/2,840);
  
  }
  
  function setStartPos(){
  
    for (let i = 0; i < grid.length; i++){
      grid[i][1].pawnB = true;
    }
  
    grid[0][0].rookB = true;
    grid[7][0].rookB = true;
  
    grid[1][0].knightB = true;
    grid[6][0].knightB = true;
  
    grid[2][0].bishopB = true;
    grid[5][0].bishopB = true;
  
    grid[3][0].queenB = true;
  
    grid[4][0].kingB = true;
  
    for (let i = 0; i < grid.length; i++){
      grid[i][6].pawnW = true;
    }
  
    grid[0][7].rookW = true;
    grid[7][7].rookW = true;
  
    grid[1][7].knightW = true;
    grid[6][7].knightW = true;
  
    grid[2][7].bishopW = true;
    grid[5][7].bishopW = true;
  
    grid[3][7].queenW = true;
  
    grid[4][7].kingW = true;
  
  }
  
  
  function createPieces(){
  
    for (let i1 = 0; i1 < grid.length; i1++){
      for (let i2 = 0; i2 < grid[i1].length; i2++){
  
        if (grid[i1][i2].pawnB){
  
          let pawnB = new PawnB(grid[i1][i2].i, grid[i1][i2].j, imgB[0]);
          pieces.push(pawnB);
  
        } else if (grid[i1][i2].rookB) {
  
          let rookB = new RookB(grid[i1][i2].i, grid[i1][i2].j, imgB[1])
          pieces.push(rookB);
  
        } else if (grid[i1][i2].knightB) {
  
          let knightB = new KnightB(grid[i1][i2].i, grid[i1][i2].j, imgB[2])
          pieces.push(knightB);
  
        } else if (grid[i1][i2].bishopB) {
  
          let bishopB = new BishopB(grid[i1][i2].i, grid[i1][i2].j, imgB[3])
          pieces.push(bishopB);
  
        } else if (grid[i1][i2].queenB) {
  
          let queenB = new QueenB(grid[i1][i2].i, grid[i1][i2].j, imgB[4])
          pieces.push(queenB);
  
        } else if (grid[i1][i2].kingB) {
  
          let kingB = new KingB(grid[i1][i2].i, grid[i1][i2].j, imgB[5])
          pieces.push(kingB);
  
        } else if (grid[i1][i2].pawnW) {
  
          let pawnW = new PawnW(grid[i1][i2].i, grid[i1][i2].j, imgW[0])
          pieces.push(pawnW);
  
        } else if (grid[i1][i2].rookW) {
  
          let rookW = new RookW(grid[i1][i2].i, grid[i1][i2].j, imgW[1])
          pieces.push(rookW);
  
        } else if (grid[i1][i2].knightW) {
  
          let knightW = new KnightW(grid[i1][i2].i, grid[i1][i2].j, imgW[2])
          pieces.push(knightW);
  
        } 
        else if (grid[i1][i2].bishopW) {
          let bishopW = new BishopW(grid[i1][i2].i, grid[i1][i2].j, imgW[3])
          pieces.push(bishopW);
  
        } 
        else if (grid[i1][i2].queenW) {
          let queenW = new QueenW(grid[i1][i2].i, grid[i1][i2].j, imgW[4])
          pieces.push(queenW);
        } 
        else if (grid[i1][i2].kingW) {
          let kingW = new KingW(grid[i1][i2].i, grid[i1][i2].j, imgW[5])
          pieces.push(kingW);
        }
      }
    }
  
    for (let i1 = 0; i1 < grid.length; i1++){
      for (let i2 = 0; i2 < grid[i1].length; i2++){
        grid[i1][i2].pawnB = false
        grid[i1][i2].rookB = false;
        grid[i1][i2].knightB = false;
        grid[i1][i2].bishopB = false;
        grid[i1][i2].queenB = false;
        grid[i1][i2].kingB = false;
        grid[i1][i2].pawnW = false;
        grid[i1][i2].rookW = false;
        grid[i1][i2].knightW = false;
        grid[i1][i2].bishopW = false;
        grid[i1][i2].queenW = false;
        grid[i1][i2].kingW = false;
      }
    }
  }

