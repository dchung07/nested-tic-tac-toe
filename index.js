const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let won = false;
let winning_message = document.getElementById('winning_message');

// Create a multi-dimensional array

let grid = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

const cellSize = canvas.width / 3;
const rows = grid.length;
const cols = grid[0].length;

function winCondition(input) {
    //input should be whether it is O or X, to denote whether it is tic or tac.
    if(input === 'O' || input === 'X') {
        if( (grid[0][0] === input &&
            grid[0][1] === input &&
            grid[0][2] === input) ||
            (
                grid[0][0] === input &&
                grid[1][1] === input &&
                grid[2][2] === input
            ) ||
            (
                grid[2][0] === input &&
                grid[1][1] === input &&
                grid[0][2] === input
            ) ||
            (
                grid[1][0] === input &&
                grid[1][1] === input &&
                grid[1][2] === input
            ) ||
            (
                grid[2][0] === input &&
                grid[2][1] === input &&
                grid[2][2] === input
            ) ||
            (
                grid[0][0] === input &&
                grid[1][0] === input &&
                grid[2][0] === input
            ) ||
            (
                grid[0][1] === input &&
                grid[1][1] === input &&
                grid[2][1] === input
            ) ||
            (
                grid[0][2] === input &&
                grid[1][2] === input &&
                grid[2][2] === input
            )
        ) {
            if(input === 'O') {
                console.log("Winner is O");
            } else if(input === 'X') {
                console.log("Winner is X");
            } else {
    
            }
            winning_message.style.display = "block";
            winning_message.textContent = "Winner, Winner, Chicken Dinner!";
            won = true;
            turn = 0;
        }
    } else {
        //Invalid Input -> Do nothing
    }
}

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
    if(!won) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
    
        const col = Math.floor(x / cellSize);
        const row = Math.floor(y / cellSize);
    
        if (grid[row][col] === '') {
            grid[row][col] = currentPlayer;
    
            if(currentPlayer === 'O') {
                grid[row][col] = 'O';
                winCondition('O');
            } else if(currentPlayer === 'X') {
                grid[row][col] === 'X';
                winCondition('X');
            }
    
            console.log(grid);
    
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            drawGrid();
        }
    } else {
        //Do nothing, game is won
    }
}

canvas.addEventListener('click', handleClick);

let reset_game = document.getElementById('reset_game');
reset_game.addEventListener('click', function() {
    turn = 'X';
    won = false;
    winning_message.textContent = "";
    winning_message.style.display = "block";
    grid = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    drawGrid();
});

window.onload = function() {
    drawGrid();
}
