const canvas = document.getElementById("gridCanvas");
const ctx = canvas.getContext("2d");

const columns = 24; // Number of columns
const rows = Math.ceil(
  window.innerHeight / (window.innerWidth / columns)
); // Calculate rows based on screen size
const borderSize = 0.2; // Size of the border
const squareSize = window.innerWidth / columns - borderSize; // Adjust square size to account for borders

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Initialize the grid state
let gridState = Array.from({ length: rows }, () =>
  Array(columns).fill(false)
);
let filledSquaresCount = 0; // Count of currently filled squares
const maxFilledSquares = Math.floor((rows * columns) / 4); // Maximum filled squares (quarter of the grid)

// Function to draw the grid
function drawGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      // Draw the filled square
      if (gridState[j][i]) {
        ctx.fillStyle = "#BFE2FF44"; // Filled square color
        ctx.fillRect(
          i * (squareSize + borderSize),
          j * (squareSize + borderSize),
          squareSize,
          squareSize
        );
      }

      // Draw the border for the square
      ctx.strokeStyle = "#DFE2FA99"; // Border color
      ctx.lineWidth = borderSize;
      ctx.strokeRect(
        i * (squareSize + borderSize),
        j * (squareSize + borderSize),
        squareSize,
        squareSize
      );
    }
  }
}

// Function to update the grid state randomly
function updateGrid() {
  if (filledSquaresCount < maxFilledSquares) {
    // If we haven't reached the max filled squares, fill a random square
    const randomRow = Math.floor(Math.random() * rows);
    const randomCol = Math.floor(Math.random() * columns);

    // Fill the square if it's not already filled
    if (!gridState[randomRow][randomCol]) {
      gridState[randomRow][randomCol] = true;
      filledSquaresCount++;
    }
  } else {
    // Randomly erase one filled square and fill a new one
    const filledPositions = [];

    // Collect filled square positions
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
        if (gridState[r][c]) {
          filledPositions.push({ row: r, col: c });
        }
      }
    }

    // Randomly select a filled square to erase
    const squareToErase =
      filledPositions[
        Math.floor(Math.random() * filledPositions.length)
      ];
    gridState[squareToErase.row][squareToErase.col] = false;
    filledSquaresCount--;

    // Now fill a new random square
    const randomRow = Math.floor(Math.random() * rows);
    const randomCol = Math.floor(Math.random() * columns);

    // Fill the square if it's not already filled
    if (!gridState[randomRow][randomCol]) {
      gridState[randomRow][randomCol] = true;
      filledSquaresCount++;
    }
  }
}

// Initial draw of the grid
drawGrid();

// Update the grid and redraw filled squares every 2 seconds
setInterval(() => {
  updateGrid();
  drawGrid();
}, 300);
