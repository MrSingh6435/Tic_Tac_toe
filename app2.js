// Log in page Variables
let playerOName; // O player's name
let playerXName; // X player's name
let startButton = document.querySelector('#start-game'); // Start Game Button

// Login page logic
startButton.addEventListener('click', (event) => {
    event.preventDefault();
    playerOName = document.querySelector("#playerO").value;
    playerXName = document.querySelector("#playerX").value;
    if (playerOName === "" || playerXName === "") {
        let accessMusic = new Audio("music/accessDenied.mp3");
        accessMusic.play();
        alert("Please enter the names of players");
    }
    else {
        let accessMusic = new Audio("music/game-bonus.mp3");
        accessMusic.play();
        document.querySelector('#game-section').classList.remove("hide");
        document.querySelector('#login').style.display = 'none';
        console.log('clicked');
        ternBox.innerText = `${playerOName}'s Turn`;
    }
});

// Color changer Div variables
let body = document.querySelector("body");
let colorDiv = document.querySelector("#colors");
const colorArr = ['colors1', 'colors2', 'colors3', 'colors4', 'colors5', 'colors6', 'colors7', 'colors8', 'colors9'];
let clickCount = 1;

// Color Changer logic
colorDiv.addEventListener('click', () => {
    clickCount++;
    let index = clickCount % colorArr.length;
    let classIs = body.getAttribute('class');
    body.classList.remove(classIs);
    body.classList.add(colorArr[index]);
    if (clickCount === colorArr.length) {
        clickCount = 0;
    }
});

// Music files
let audioTurn = new Audio("music/ting.mp3");
// let gameOverMusic = new Audio("music/gameover.mp3");
let gameOverMusic = new Audio("music/gameOver.mp3");
let winMusic = new Audio("music/win.mp3");
// let restartMusic = new Audio("music/drumDj.mp3");
let restartMusic = new Audio("music/restart.mp3");
let newGameMusic = new Audio("music/newGame.mp3");

// Game logic
let boxes = document.querySelectorAll(".box"); // Game Boxes
let newGame = document.querySelector("#new-game"); // New game button
let restartGame = document.querySelector("#restart"); // Restart game button
let winnerIs = document.querySelector("#winnerIs"); // Winner section
let ternBox = document.querySelector("#turn"); // tern box 
let drawGif = document.querySelector("#draw"); // Draw game gif
let dancingGif = document.querySelector("#dance"); // win game gif

let gameOver = false;
let noWinner = true;
let count = 0;
let turnO = true;

const winPat = [
    [0, 1, 2],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
]; // winning patterns

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        audioTurn.play();
        box.disabled = true; // Disabling the box after filled data
        box.classList.add('disabled-box'); // Eh v same
        
        if (turnO && box.innerText === "") {
            box.innerText = 'O';
            ternBox.innerText = `${playerXName}'s Turn`;
            turnO = false;
        } else if (!turnO && box.innerText === "") {
            box.innerText = 'X';
            ternBox.innerText = `${playerOName}'s Turn`;
            turnO = true;
        }
        count++;
        if (count === 8) {
            gameOver = true;
        }
        checkWinner();
    });
});

let showWinner = (winner) => {
    if (winner === 'O') {
        winnerIs.innerText = `The winner is ${playerOName}`;
        noWinner = false;
    }
    else {
        winnerIs.innerText = `The winner is ${playerXName}`;
        noWinner = false;
    }
    //Disabling all the boxes
    for (box of boxes) {
        box.disabled = true;
        box.classList.add('disabled-box');
    }

    winnerIs.style.visibility = 'visible';
    dancingGif.style.display = 'block';
    count = 0;
    winMusic.play();
    ternBox.innerText = "Game Over";
};


const checkWinner = () => {
    for (let pattern of winPat) {
        let post1val = boxes[pattern[0]].innerText;
        let post2val = boxes[pattern[1]].innerText;
        let post3val = boxes[pattern[2]].innerText;

        if (post1val !== "" && post1val === post2val && post2val === post3val) {
            showWinner(post1val);
            disableBoxes();
            gameOver = true;
        }
        else if (gameOver && count === 9 && noWinner) {
            winnerIs.innerText = "Match is Draw";
            winnerIs.style.visibility = 'visible';
            drawGif.style.display = 'block';
            count = 0;
            gameOverMusic.play();
            ternBox.innerText = "Game Over";
        }
    }
}

let reset = () => { // fuction to restart the game
    for (box of boxes) {
        box.disabled = true;
        box.classList.remove('disabled-box');
        box.innerText = '';
    }
    restartMusic.play();
    winnerIs.style.visibility = 'hidden';
    dancingGif.style.display = 'none';
    drawGif.style.display = 'none';
    count = 0;
    if (turnO && box.innerText === "") {
        ternBox.innerText = `${playerOName}'s Turn`;
        console.log("tunr O", turnO);
    } else if (!turnO && box.innerText === "") {
        ternBox.innerText = `${playerXName}'s Turn`;
    }
}

restartGame.addEventListener('click', reset);
newGame.addEventListener('click', () => {
    newGameMusic.play();
    // location.reload();
});