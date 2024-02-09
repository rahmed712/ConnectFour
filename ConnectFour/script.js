let playerRed = "R";
let playerYellow = "Y";
let currentPlayer = playerRed;

let gameOver = false;
let grid = [];

const rows = 6;
const columns = 7;
let currentColumns = Array(columns).fill(rows - 1); // Initialized with the max row for each column.

// Initializes the game.
window.onload = function() {
    setGame();
}

// Sets up the game board 
function setGame() {
    grid = Array.from({length: rows}, () => Array(columns).fill(' ')); // Initialize grid with spaces.

    grid.forEach((row, r) => {
        row.forEach((_, c) => {
            let circle = document.createElement("div");
            circle.id = `${r},${c}`;
            circle.classList.add("circle");
            circle.addEventListener("click", setPiece);
            document.getElementById("connectfour").appendChild(circle);
        });
    });
}

// This function is for setting a piece on the board.
function setPiece() {
    if (gameOver) return;

    let [r, c] = this.id.split(",").map(Number); // Get the coordinates from the clicked circle.
    r = currentColumns[c]; // Update the row to the next available space in the column.

    if (r < 0) return; // If the column is full, do nothing.

    grid[r][c] = currentPlayer; // Place the current player's piece in the grid.
    document.getElementById(`${r},${c}`).classList.add(currentPlayer === playerRed ? "red-piece" : "yellow-piece");
    
    currentPlayer = currentPlayer === playerRed ? playerYellow : playerRed; // Switch players.
    currentColumns[c]--; // Move up the column for the next piece.

    checkWinner();
}

// Checks for a winner in all directions.
function checkWinner() {
    checkHorizontal() || checkVertical() || checkDiagonal() || checkReverseDiagonal();
}

// Check horizontally for a winner.
//The && operatorin JavaScript is a logical operator that returns true if both of its operands
// are true, and false otherwise. It is also known as the logical AND operator.
//The && operator is often used in conditional statements to check if multiple conditions are met.
//The slice() method in JavaScript extracts a section of an array or string and
//returns it as a new array or string, without modifying the original array or string. 
function checkHorizontal() {
    grid.forEach((row, r) => {
        row.forEach((cell, c) => {
            if (c <= columns - 4 && cell !== ' ' && row.slice(c, c + 4).every(value => value === cell)) {
                setWinner(r, c);
            }
        });
    });
}

// Check vertically for a winner.
function checkVertical() {
    grid[0].forEach((_, c) => {
        grid.forEach((row, r) => {
            if (r <= rows - 4 && grid.slice(r, r + 4).every(row => row[c] === grid[r][c]) && grid[r][c] !== ' ') {
                setWinner(r, c);
            }
        });
    });
}

// Checks diagonally from bottom left to top right for a winner.
function checkDiagonal() {
    grid.forEach((row, r) => {
        row.forEach((_, c) => {
            if (r >= 3 && c <= columns - 4 && Array.from({length: 4}, (_, i) => grid[r - i][c + i]).every(value => value === grid[r][c]) && grid[r][c] !== ' ') {
                setWinner(r, c);
            }
        });
    });
}

// Checks diagonally from bottom right to top left for a winner.
function checkReverseDiagonal() {
    grid.forEach((row, r) => {
        row.forEach((_, c) => {
            if (r >= 3 && c >= 3 && Array.from({length: 4}, (_, i) => grid[r - i][c - i]).every(value => value === grid[r][c]) && grid[r][c] !== ' ') {
                setWinner(r, c);
            }
        });
    });
}

// Sets the winner.
function setWinner(r, c) {
    document.getElementById("winner").innerText = `${grid[r][c] === playerRed ? "Red" : "Yellow"} Player Wins!`;
    gameOver = true;
}
// Resets game
function reset(){
    let button=document.getElementById("reset")
    console.log("test")
    button.addEventListener("click", function(){
        console.log("rsfaf")
    })
}
reset()
