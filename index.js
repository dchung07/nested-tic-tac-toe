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
    myCanvas1Won: false,
    myCanvas2Won: false,
    myCanvas3Won: false,
    myCanvas4Won: false,
    myCanvas5Won: false,
    myCanvas6Won: false,
    myCanvas7Won: false,
    myCanvas8Won: false,
    myCanvas9Won: false
};

const cellSize = 300 / 3;

function winCondition(canvasGrid, input, canvasName) {
    if (input === 'O' || input === 'X') {
        if (
            (canvasGrid[0][0] === input && canvasGrid[0][1] === input && canvasGrid[0][2] === input) ||
            (canvasGrid[0][0] === input && canvasGrid[1][1] === input && canvasGrid[2][2] === input) ||
            (canvasGrid[2][0] === input && canvasGrid[1][1] === input && canvasGrid[0][2] === input) ||
            (canvasGrid[1][0] === input && canvasGrid[1][1] === input && canvasGrid[1][2] === input) ||
            (canvasGrid[2][0] === input && canvasGrid[2][1] === input && canvasGrid[2][2] === input) ||
            (canvasGrid[0][0] === input && canvasGrid[1][0] === input && canvasGrid[2][0] === input) ||
            (canvasGrid[0][1] === input && canvasGrid[1][1] === input && canvasGrid[2][1] === input) ||
            (canvasGrid[0][2] === input && canvasGrid[1][2] === input && canvasGrid[2][2] === input)
        ) {
            console.log(`Winner is ${input}`);
            document.getElementById('winning_message').style.display = "block";
            document.getElementById('winning_message').textContent = "Winner, Winner, Chicken Dinner!";
            winStatus[`${canvasName}Won`] = true;
        }
    }
}

function drawGrid(canvasInput, canvasName) {
    const ctx = canvasInput.getContext('2d');
    const canvasGrid = grids[canvasName];

    ctx.clearRect(0, 0, canvasInput.width, canvasInput.height);
    for (let row = 0; row < canvasGrid.length; row++) {
        for (let col = 0; col < canvasGrid[row].length; col++) {
            ctx.strokeRect(col * cellSize, row * cellSize, cellSize, cellSize);
            //If win Con

            if(winStatus[`${canvasName}Won`]) {
                ctx.clearRect(0, 0, canvasInput.width, canvasInput.height);
                ctx.font = `${canvasInput.width * 0.8}px Arial`;
                // ctx.textAlign = 'center';
                // ctx.textBaseline = 'middle';

                //Change text to whatever they won with.
                if(currentPlayer === 'O') {
                    currentPlayer = 'X';
                } else if(currentPlayer === 'X') {
                    currentPlayer = 'O';
                }
                ctx.fillText(currentPlayer, canvasInput.width/2, canvasInput.height/2);
            } else {
                if (canvasGrid[row][col]) {
                    ctx.font = `${cellSize * 0.8}px Arial`;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(canvasGrid[row][col], (col + 0.5) * cellSize, (row + 0.5) * cellSize);
                }   
            }
        }
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

            if (currentPlayer === 'O') {
                winCondition(canvasGrid, 'O', canvasName);
            } else if (currentPlayer === 'X') {
                winCondition(canvasGrid, 'X', canvasName);
            }

            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            drawGrid(canvasInput, canvasName);
        }
    }
}

const canvases = document.querySelectorAll('canvas');
canvases.forEach((canvas) => {
    canvas.addEventListener('click', (event) => handleClick(event, canvas, canvas.id));
});

document.getElementById('reset_game').addEventListener('click', function() {
    currentPlayer = 'X';
    // for(let win in winStatus) {
    //     if(winStatus.hasOwnProperty(win)) {
    //         winStatus.win = false;
    //     }
    // }
    winStatus.myCanvas1Won = false;
    winStatus.myCanvas2Won = false;
    winStatus.myCanvas3Won = false;
    winStatus.myCanvas4Won = false;
    winStatus.myCanvas5Won = false;
    winStatus.myCanvas6Won = false;
    winStatus.myCanvas7Won = false;
    winStatus.myCanvas8Won = false;
    winStatus.myCanvas9Won = false;
    document.getElementById('winning_message').style.display = "none";
    grids.myCanvas1 = [['', '', ''], ['', '', ''], ['', '', '']];
    grids.myCanvas2 = [['', '', ''], ['', '', ''], ['', '', '']];
    grids.myCanvas3 = [['', '', ''], ['', '', ''], ['', '', '']];
    grids.myCanvas4 = [['', '', ''], ['', '', ''], ['', '', '']];
    grids.myCanvas5 = [['', '', ''], ['', '', ''], ['', '', '']];
    grids.myCanvas6 = [['', '', ''], ['', '', ''], ['', '', '']];
    grids.myCanvas7 = [['', '', ''], ['', '', ''], ['', '', '']];
    grids.myCanvas8 = [['', '', ''], ['', '', ''], ['', '', '']];
    grids.myCanvas9 = [['', '', ''], ['', '', ''], ['', '', '']];
    drawGrid(document.getElementById('myCanvas1'), "myCanvas1");
    drawGrid(document.getElementById('myCanvas2'), "myCanvas2");
    drawGrid(document.getElementById('myCanvas3'), "myCanvas3");
    drawGrid(document.getElementById('myCanvas4'), "myCanvas4");
    drawGrid(document.getElementById('myCanvas5'), "myCanvas5");
    drawGrid(document.getElementById('myCanvas6'), "myCanvas6");
    drawGrid(document.getElementById('myCanvas7'), "myCanvas7");
    drawGrid(document.getElementById('myCanvas8'), "myCanvas8");
    drawGrid(document.getElementById('myCanvas9'), "myCanvas9");
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