const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Create a multi-dimensional array

const grid = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

// Example of how it would work:

grid[0][0] = 'X';
grid[2][2] = 'O';

console.log(grid);

const cellSize = canvas.width / 3;
const rows = grid.length;
const cols = grid[0].length;

function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let row = 0; row < rows; row++) {
        for(let col = 0; col < cols; col++) {
            ctx.strokeRect(col * cellSize, row * cellSize, cellSize, cellSize);
        }
    }
}

window.onload = function() {
    drawGrid();
}
