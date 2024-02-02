let playerRed = "R";
let playerYellow = "Y";
let currentPlayer = playerRed;

let gameOver = false;
let grid=[];

let rows = 6;
let columns = 7;
let currColumns = []; //keeps track of which row each column is at.

window.onload = function() {
    setGame();
}

function setGame() {
    
    currColumns = [5, 5, 5, 5, 5, 5, 5];

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            // JS
            row.push(' ');
            // HTML
            let circle = document.createElement("div");
            circle.id = r.toString() + "," + c.toString();
            circle.classList.add("circle");
            circle.addEventListener("click", setPiece);
            document.getElementById("connectfour").append(circle);
        }
        grid.push(row);
    }
}

function setPiece() {
    if (gameOver) {
        return;
    }

    //get coordinates of that circle clicked
    let coordinates = this.id.split(",");
    let r = parseInt(coordinates[0]);
    let c = parseInt(coordinates[1]);

    // figure out which row the current column should be on
    r = currColumns[c]; 

    if (r < 0) { // You can't have negative 1 row space because it ran out of row space
        return;
    }

    grid[r][c] = currentPlayer; //update JS grid
    let circle = document.getElementById(r.toString() + "," + c.toString());
    if (currentPlayer == playerRed) { //If current player is red and drops the piece, then it swtiches to player yellow
        circle.classList.add("red-piece");
        currentPlayer = playerYellow;
    }
    else {
        circle.classList.add("yellow-piece");
        currentPlayer = playerRed;
    }

    r -= 1; //Every time a piece is added to a row, the next row goes up by 1
    currColumns[c] = r; 

    
checkHorizontal();
checkVertical();
checkDiagnol();
checkReverseDiagnol();
}

function checkHorizontal(){
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++){
           if (grid[r][c] != ' ') {
               if (grid[r][c] == grid[r][c+1] && grid[r][c+1] == grid[r][c+2] && grid[r][c+2] == grid[r][c+3]) {
                   setWinner(r, c);
                   return;
               }
           }
        }
   }
}

function checkVertical(){
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (grid[r][c] != ' ') {
                if (grid[r][c] == grid[r+1][c] && grid[r+1][c] == grid[r+2][c] && grid[r+2][c] == grid[r+3][c]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
}

/**Check from bottom left to upper right
     X
    X
   X
 X
 */
function checkDiagnol(){
for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (grid[r][c] != ' ') {
                if (grid[r][c] == grid[r-1][c+1] && grid[r-1][c+1] == grid[r-2][c+2] && grid[r-2][c+2] == grid[r-3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
}


/** Check from bottom right to upper left
X
 X
  X
   X
 */
function checkReverseDiagnol(){
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (grid[r][c] != ' ') {
                if (grid[r][c] == grid[r+1][c+1] && grid[r+1][c+1] == grid[r+2][c+2] && grid[r+2][c+2] == grid[r+3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
}



function setWinner(r, c) {
    let winner = document.getElementById("winner");
    if (grid[r][c] == playerRed) {
        winner.innerText = "Red Player Wins!";             
    } else {
        winner.innerText = "Yellow Player Wins!";
    }
    gameOver = true;
}

function reset(){
    let button=document.getElementById("reset")
    console.log("test")
    button.addEventListener("click", function(){
        console.log("rsfaf")
    })
}
reset()