/* Goals: 
- Have as little global code as possible, try tucking everthing away inside a module or factory
  - Rule of thumb: If you ever need ONE of something (gameBoard, displayContriller) use a module. 
    If you need multoples of something (players), use a factory */

// Global variables

const X_CLASS = 'x';
const O_CLASS = 'o';
let aiTurn = false;

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

let currentClass;

// getting all the cell element
const cellElements = Array.from(document.querySelectorAll(".cell"));

// getting the reset button
const reset_button = document.querySelector("#restart");


function startGame() {

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

    playersTurn(cell);
    if (checkWinner(currentClass)) {
        if (currentClass == X_CLASS){
            console.log('The player has won');
        }
        else {
            console.log('The AI has won');
        }

        const winningMessage_div = document.querySelector(".winning-message");
        winningMessage_div.style.display = 'flex';
    }

    aiDecision(cellElements);

    
    if (checkWinner(currentClass)) {
        if (currentClass == X_CLASS){
            console.log('The player has won');
        }
        else {
            console.log('The AI has won');
        }

        const winningMessage_div = document.querySelector(".winning-message");
        winningMessage_div.style.display = 'flex';
    }

}

function playersTurn(cell){
    currentClass = X_CLASS;
    placeMark(cell, X_CLASS);
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}
        
function available(cell){
    if (cell.classList.item(1) != 'x' && cell.classList.item(1) != 'o'){
        return true;
    }
    else{
        return false;
    }
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
    const winningMessage_div = document.querySelector(".winning-message");
    winningMessage_div.style.display = 'none';
    startGame();
}


function aiDecision(cellElements){
    // debugger;
    currentClass = O_CLASS;
    let madeDecision = false;
    
    while (!madeDecision){

        // Make a random choice between 0 - 8:
        let choice = getRandomInt(8);
        let chosenCell = cellElements[choice];

        if (available(chosenCell)){
            placeMark(chosenCell, O_CLASS);
            madeDecision = true;
        }

        else {
          madeDecision = false  
        }
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function minimax(){

}

startGame();
reset_button.addEventListener("click", restart); // remove paran

/*
1. How come check winner is working?
2. How come the availabilty function is not working? (Issue with the current class system)
*/

// Archived:
// function switchTurn() {
//     aiTurn = !aiTurn;
// }

// function filled(cellElements) {
//     for (let i = 0; i < cellElements.length; i++) {
//         if (cellElements === undefined) {
//             return false;
//         }
//     }
//     return true;
// }

// NOTE: Cell is the one that is currently being targerted, Cell Elements is all the cells available