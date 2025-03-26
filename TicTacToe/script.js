const board = document.getElementById("board");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");

let gameBoard = Array(9).fill(null);
let currentPlayer = "X";
let isGameActive = true;

// Winning combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Initialize the board
function createBoard() {
  board.innerHTML = "";
  gameBoard.forEach((_, index) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = index;
    cell.addEventListener("click", handleCellClick);
    board.appendChild(cell);
  });
}

// Handle cell clicks
function handleCellClick(event) {
  const cell = event.target;
  const index = cell.dataset.index;

  if (gameBoard[index] || !isGameActive) return;

  gameBoard[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add("taken");

  if (checkWinner()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    isGameActive = false;
  } else if (gameBoard.every(cell => cell)) {
    statusText.textContent = "It's a tie!";
    isGameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

// Check for a winner
function checkWinner() {
  return winningCombinations.some(combination => {
    const [a, b, c] = combination;
    return (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    );
  });
}

// Reset the game
resetButton.addEventListener("click", () => {
  gameBoard = Array(9).fill(null);
  currentPlayer = "X";
  isGameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  createBoard();
});

// Initialize the game
createBoard();
