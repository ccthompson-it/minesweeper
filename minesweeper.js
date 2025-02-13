document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var boardSize = 3
var board = {
  cells: [
  ]
}


function playAgain(){
  if (confirm("No, I think you should play again!")) {
    startGame()
  } else {
    playAgain()
  }
}
function createBoard(size){
  board.cells = []
  for( var i=0; i<size; i++){
    for( var j=0; j<size; j++){
      var cell = {
        row: i,
        col: j,
        isMine: false,
        isMarked: false,
        hidden: true,
      }
      var random = Math.floor(Math.random() * 10)
      if( random > 6.5){
        cell.isMine = true
      }
      board.cells.push(cell)
    }
  }
}

function startGame () {
  var boardSize = parseInt(prompt("How many cells per side?", "Max 6"), 10)
  createBoard(boardSize)
  for( var i=0; i<board.cells.length; i++){
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
  }
  document.addEventListener("click", checkForWin)
  document.addEventListener("contextmenu", checkForWin)
  // Don't remove this function call: it makes the game work!
  lib.initBoard()
  
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
  for( var i=0; i<board.cells.length; i++){
    if( board.cells[i].isMine == true && board.cells[i].isMarked == false ){
      return
    }
    else if( board.cells[i].isMine == false && board.cells[i].hidden == true ){
      return
    }
  }
  
  if (confirm("Congratulations! Play Again?")) {
    startGame()
  } else {
    playAgain()
  }
  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  //   lib.displayMessage('You win!')
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
  var count = 0
  var surrounding = lib.getSurroundingCells(cell.row, cell.col)
  for( var i=0; i<surrounding.length; i++){
    if(surrounding[i].isMine){
      count += 1
    }
  }
  return count
}

