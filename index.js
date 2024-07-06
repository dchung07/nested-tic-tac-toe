const grids = {
    myCanvas1: [['', '', ''], ['', '', ''], ['', '', '']],
    myCanvas2: [['', '', ''], ['', '', ''], ['', '', '']],
    myCanvas3: [['', '', ''], ['', '', ''], ['', '', '']],
    myCanvas4: [['', '', ''], ['', '', ''], ['', '', '']],
    myCanvas5: [['', '', ''], ['', '', ''], ['', '', '']],
    myCanvas6: [['', '', ''], ['', '', ''], ['', '', '']],
    myCanvas7: [['', '', ''], ['', '', ''], ['', '', '']],
    myCanvas8: [['', '', ''], ['', '', ''], ['', '', '']],
    myCanvas9: [['', '', ''], ['', '', ''], ['', '', '']]
};

let currentPlayer = 'X';

const winStatus = {
    myCanvas1Won: '',
    myCanvas2Won: '',
    myCanvas3Won: '',
    myCanvas4Won: '',
    myCanvas5Won: '',
    myCanvas6Won: '',
    myCanvas7Won: '',
    myCanvas8Won: '',
    myCanvas9Won: ''
};

const cellSize = 300 / 3;

function winCondition(canvasGrid, input, canvasName) {
    if (input === 'O' || input === 'X') {
        const winningCombos = [
            [[0,0], [0,1], [0,2]],
            [[1,0], [1,1], [1,2]],
            [[2,0], [2,1], [2,2]],
            [[0,0], [1,0], [2,0]],
            [[0,1], [1,1], [2,1]],
            [[0,2], [1,2], [2,2]],
            [[0,0], [1,1], [2,2]],
            [[2,0], [1,1], [0,2]]
        ];

        for (let combo of winningCombos) {
            if (combo.every(([row, col]) => canvasGrid[row][col] === input)) {
                console.log(`Winner is ${input}`);
                winStatus[`${canvasName}Won`] = input;
                return combo; // Return the winning combination
            }
        }
    }
    return null;
}

function drawGrid(canvasInput, canvasName) {
    const ctx = canvasInput.getContext('2d');
    const canvasGrid = grids[canvasName];

    ctx.clearRect(0, 0, canvasInput.width, canvasInput.height);
    
    // Draw the grid and existing moves
    for (let row = 0; row < canvasGrid.length; row++) {
        for (let col = 0; col < canvasGrid[row].length; col++) {
            ctx.strokeRect(col * cellSize, row * cellSize, cellSize, cellSize);
            if (canvasGrid[row][col]) {
                ctx.font = `${cellSize * 0.8}px Arial`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(canvasGrid[row][col], (col + 0.5) * cellSize, (row + 0.5) * cellSize);
            }   
        }
    }

    // If the canvas is won, draw the overlay
    if(winStatus[`${canvasName}Won`]) {
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvasInput.width, canvasInput.height);
        ctx.globalAlpha = 1.0;
        ctx.fillStyle = 'black';
        ctx.font = `${canvasInput.width * 0.8}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(winStatus[`${canvasName}Won`], canvasInput.width/2, canvasInput.height/2);
    }
}

function handleClick(event, canvasInput, canvasName) {
    const canvasGrid = grids[canvasName];

    if (!winStatus[`${canvasName}Won`]) {
        const rect = canvasInput.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const col = Math.floor(x / cellSize);
        const row = Math.floor(y / cellSize);

        if (canvasGrid[row][col] === '') {
            canvasGrid[row][col] = currentPlayer;

            const winningCombo = winCondition(canvasGrid, currentPlayer, canvasName);
            if (winningCombo) {
                drawWinningLine(canvasInput, winningCombo);
                checkOverallWin();
            }

            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            drawGrid(canvasInput, canvasName);
        }
    }
}

function drawWinningLine(canvas, winningCombo) {
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo((winningCombo[0][1] + 0.5) * cellSize, (winningCombo[0][0] + 0.5) * cellSize);
    ctx.lineTo((winningCombo[2][1] + 0.5) * cellSize, (winningCombo[2][0] + 0.5) * cellSize);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 5;
    ctx.stroke();
}

function checkOverallWin() {
    const overallWinningCombos = [
        ['myCanvas1Won', 'myCanvas2Won', 'myCanvas3Won'],
        ['myCanvas4Won', 'myCanvas5Won', 'myCanvas6Won'],
        ['myCanvas7Won', 'myCanvas8Won', 'myCanvas9Won'],
        ['myCanvas1Won', 'myCanvas4Won', 'myCanvas7Won'],
        ['myCanvas2Won', 'myCanvas5Won', 'myCanvas8Won'],
        ['myCanvas3Won', 'myCanvas6Won', 'myCanvas9Won'],
        ['myCanvas1Won', 'myCanvas5Won', 'myCanvas9Won'],
        ['myCanvas3Won', 'myCanvas5Won', 'myCanvas7Won']
    ];

    for (let combo of overallWinningCombos) {
        if (combo.every(canvas => winStatus[canvas] === winStatus[combo[0]] && winStatus[canvas] !== '')) {
            const winner = winStatus[combo[0]];
            document.getElementById('winning_message').style.display = "block";
            document.getElementById('winning_message').textContent = `Winner, Winner, Chicken Dinner!`;
            drawOverallWinningLine(combo);
            return;
        }
    }
}

function drawOverallWinningLine(winningCombo) {
    const startCanvas = document.getElementById(winningCombo[0].replace('Won', ''));
    const endCanvas = document.getElementById(winningCombo[2].replace('Won', ''));
    const startRect = startCanvas.getBoundingClientRect();
    const endRect = endCanvas.getBoundingClientRect();

    const line = document.createElement('div');
    line.style.position = 'absolute';
    line.style.backgroundColor = 'red';
    line.style.height = '5px';
    line.style.width = `${endRect.right - startRect.left}px`;
    line.style.top = `${(startRect.top + endRect.bottom) / 2}px`;
    line.style.left = `${startRect.left}px`;
    line.style.transform = 'translate(0, -50%)';
    line.style.zIndex = '1000';

    document.body.appendChild(line);
}

const canvases = document.querySelectorAll('canvas');
canvases.forEach((canvas) => {
    canvas.addEventListener('click', (event) => handleClick(event, canvas, canvas.id));
});

document.getElementById('reset_game').addEventListener('click', function() {
    currentPlayer = 'X';
    for (let key in winStatus) {
        winStatus[key] = '';
    }
    document.getElementById('winning_message').style.display = "none";
    for (let key in grids) {
        grids[key] = [['', '', ''], ['', '', ''], ['', '', '']];
    }
    canvases.forEach(canvas => drawGrid(canvas, canvas.id));
});

window.onload = function() {
    drawGrid(document.getElementById('myCanvas1'), "myCanvas1");
    drawGrid(document.getElementById('myCanvas2'), "myCanvas2");
    drawGrid(document.getElementById('myCanvas3'), "myCanvas3");
    drawGrid(document.getElementById('myCanvas4'), "myCanvas4");
    drawGrid(document.getElementById('myCanvas5'), "myCanvas5");
    drawGrid(document.getElementById('myCanvas6'), "myCanvas6");
    drawGrid(document.getElementById('myCanvas7'), "myCanvas7");
    drawGrid(document.getElementById('myCanvas8'), "myCanvas8");
    drawGrid(document.getElementById('myCanvas9'), "myCanvas9");
}