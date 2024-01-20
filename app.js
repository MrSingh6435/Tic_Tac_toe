// Log in page Variables
let playerOName; // O player's name
let playerXName; // X player's name
let startButton = document.querySelector('#start-game'); // Start Game Button
let accessMusic;

// Login page logic
startButton.addEventListener('click', (event) => {
    event.preventDefault();
    playerOName = document.querySelector("#playerO").value;
    playerXName = document.querySelector("#playerX").value;
    if (playerOName === "" || playerXName === "") {
        accessMusic = new Audio("music/accessDenied.mp3");
        playMusic('access');
        alert("Please enter the names of players");
    }
    else {
        accessMusic = new Audio("music/game-bonus.mp3");
        playMusic('access');
        document.querySelector('#game-section').classList.remove("hide");
        document.querySelector('#login').style.display = 'none';
        ternBox.innerText = `${playerOName}'s Turn`;
        // newGame.style.display = 'block';
        // newGame1.style.display = 'block';
    }
});

// Color changer Div variables
let body = document.querySelector("body");
let colorDiv = document.querySelector("#colors");
const colorArr = ['colors1', 'colors2', 'colors3', 'colors4', 'colors5', 'colors6', 'colors7', 'colors8', 'colors9'];
let clickCount = 1;

// Color Changer logic
colorDiv.addEventListener('click', () => {
    playMusic("colorChangingMusic");
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
let gameOverMusic = new Audio("music/gameOver.mp3");
let winMusic = new Audio("music/win.mp3");
let restartMusic = new Audio("music/restart.mp3");
let newGameMusic = new Audio("music/newGame.mp3");
let colorChangingMusic = new Audio("music/changingColor.mp3");

// Just for fun
document.querySelector('#logo').addEventListener('click', () => {
    let tejayMusic = new Audio("music/thunder.mp3");
    tejayMusic.play();
});

// Game logic
let boxes = document.querySelectorAll(".box"); // Game Boxes
let newGame = document.querySelector("#new-game"); // New game button
let newGame1 = document.querySelector("#new-game1"); // New game button
let restartGame = document.querySelector("#restart"); // Restart game button
let winnerIs = document.querySelector("#winnerIs"); // Winner section
let ternBox = document.querySelector("#turn"); // tern box 
let drawGif = document.querySelector("#draw"); // Draw game gif
let dancingGif = document.querySelector("#dance"); // win game gif

let turnCount = 0;
let gameover = false;
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

// Playing game function
boxes.forEach((box) => {
    box.addEventListener('click', () => {
        playMusic("turn");
        box.classList.add('disabled-box'); // Disabling the box after filled data
        if (turnO) {
            box.innerText = 'O';
            ternBox.innerText = `${playerXName}'s Turn`;
            turnO = false;
        }
        else if (!turnO) {
            box.innerText = 'X';
            ternBox.innerText = `${playerOName}'s Turn`;
            turnO = true;
        }
        turnCount++;
        checkWinner();
    });
});

const checkWinner = () => {
    let winner = false;
    for (let pattern of winPat) {
        let boX1 = boxes[pattern[0]].innerText;
        let boX2 = boxes[pattern[1]].innerText;
        let boX3 = boxes[pattern[2]].innerText;

        if (boX1 !== "" && boX1 === boX2 && boX2 === boX3) {
            showWinner(boX1);
            winner = true;
        }
    }

    if (!winner && turnCount === 9) {
        console.log("else winner ", winner);
        winnerIs.innerText = "Match is Draw";
        winnerIs.style.visibility = 'visible';
        drawGif.style.display = 'block';
        playMusic("gameOver");
        ternBox.innerText = "Game Over";
    }
}

let showWinner = (winner) => {
    if (winner === 'O') {
        winnerIs.innerText = `The winner is ${playerOName}`;
    }
    else {
        winnerIs.innerText = `The winner is ${playerXName}`;
    }
    //Disabling all the boxes
    for (box of boxes) {
        box.classList.add('disabled-box');
    }
    winnerIs.style.visibility = 'visible';
    dancingGif.style.display = 'block';
    playMusic("winMusic");
    ternBox.innerText = "Game Over";
};

let reset = () => { // fuction to restart the game
    for (box of boxes) {
        box.disabled = true;
        box.classList.remove('disabled-box');
        box.innerText = '';
    }
    playMusic("restart");
    winnerIs.style.visibility = 'hidden';
    dancingGif.style.display = 'none';
    drawGif.style.display = 'none';
    turnCount = 0;
    if (turnO && box.innerText === "") {
        ternBox.innerText = `${playerOName}'s Turn`;
        console.log("tunr O", turnO);
    } else if (!turnO && box.innerText === "") {
        ternBox.innerText = `${playerXName}'s Turn`;
    }
}

restartGame.addEventListener('click', reset);
newGame.addEventListener('click', () => {
    startNewGame()
});

newGame1.addEventListener('click', () => {
    startNewGame()
});

function startNewGame() {
    playMusic("newGame");
    document.querySelector('#game-section').classList.add("hide");
    document.querySelector('#login').style.display = 'flex';
    document.querySelector("#playerO").value = '';
    document.querySelector("#playerX").value = '';
    ternBox.innerText = `${playerOName}'s Turn`;
}

// music mute unmute system 
let muteUnmute = document.querySelector(".music");
muteUnmute.addEventListener('click', () => {
    if (muteUnmute.innerText === "volume_up") {
        muteUnmute.innerText = "volume_off";
        muteMusic();
    }
    else {
        muteUnmute.innerText = "volume_up";
    }
})
let playMusic = (music) => {
    if (muteUnmute.innerText === "volume_up") {
        if (music === "access") {
            accessMusic.play();
        } else if (music === "turn") {
            audioTurn.play();
        }
        else if (music === "gameOver") {
            gameOverMusic.play();
        }
        else if (music === "winMusic") {
            winMusic.play();
        }
        else if (music === "restart") {
            restartMusic.play();
        }
        else if (music === "newGame") {
            newGameMusic.play();
        }
        else if (music === "colorChangingMusic") {
            colorChangingMusic.play();
        }
    }else{
        console.log("music is muted");
    }
}