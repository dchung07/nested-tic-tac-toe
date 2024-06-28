const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Create a multi-dimensional array

const grid = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

const cellSize = canvas.width / 3;
const rows = grid.length;
const cols = grid[0].length;

let currentPlayer = 'X';

function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let row = 0; row < rows; row++) {
        for(let col = 0; col < cols; col++) {
            ctx.strokeRect(col * cellSize, row * cellSize, cellSize, cellSize);
            if (grid[row][col]) {
                ctx.font = `${cellSize * 0.8}px Arial`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(grid[row][col], (col + 0.5) * cellSize, (row + 0.5) * cellSize);
            }
        }
    }
}

function handleClick(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const col = Math.floor(x / cellSize);
    const row = Math.floor(y / cellSize);

    if (grid[row][col] === '') {
        grid[row][col] = currentPlayer;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        drawGrid();
    }
}

canvas.addEventListener('click', handleClick);

window.onload = function() {
    drawGrid();
}
