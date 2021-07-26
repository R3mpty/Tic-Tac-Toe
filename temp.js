/*
Goals: 
- Have as little global code as possible, try tucking everthing away inside a module or factory
  - Rule of thumb: If you ever need ONE of something (gameBoard, displayContriller) use a module. 
    If you need multoples of something (players), use a factory

 */

// Global variables

// implemented
const X_CLASS = 'x';
const O_CLASS = 'o';
let circleTurn = false;
let winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // horizontal
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // vertical
    [0, 4, 8],
    [2, 4, 6] // diagonal
];

// getting all the cell element
const cellElements = Array.from(document.querySelectorAll(".cell"));

// getting the reset button
const reset_button = document.querySelector("#restart");


function startGame() {
    console.log("This is in start game")
    // implemented
    for (let i = 0; i < cellElements.length; i++) {

        // remove previously existing elements
        cellElements[i].classList.remove(X_CLASS);
        cellElements[i].classList.remove(O_CLASS);

        cellElements[i].addEventListener('click', game, {
            once: true
        }) // once true prevents unwanted change
    }

}

function game(e) {

    cell = e.target;
    let currentClass;

    if (circleTurn) {
        currentClass = O_CLASS;
    } else {
        currentClass = X_CLASS;
    }

    placeMark(cell, currentClass);
    switchTurn();

    if (checkWinner(currentClass)) {
        console.log(currentClass + " has won! ");
        const winningMessage_div = document.querySelector(".winning-message");
        winningMessage_div.style.display = 'flex';
    }

}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function switchTurn() {
    circleTurn = !circleTurn;
}

function filled(cellElements) {
    for (let i = 0; i < cellElements.length; i++) {
        if (cellElements === undefined) {
            return false;
        }
    }
    return true;
}

function checkWinner(currentClass) {
    // see if we have atleast got a single winning combination
    return winningCombination.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        })
    })
}

function restart() {
    console.log("hi");
    const winningMessage_div = document.querySelector(".winning-message");
    winningMessage_div.style.display = 'none';
    startGame();
}


startGame();
reset_button.addEventListener("click", restart());