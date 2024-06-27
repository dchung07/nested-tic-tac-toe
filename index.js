const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Create a multi-dimensional array

const grid = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
];

// Example of how it would work:

grid[0][0] = 'X';
grid[2][2] = 'O';

console.log(grid);