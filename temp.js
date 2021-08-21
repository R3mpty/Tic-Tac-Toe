/* Goals: 
- Have as little global code as possible, try tucking everthing away inside a module or factory
  - Rule of thumb: If you ever need ONE of something (gameBoard, displayContriller) use a module. 
    If you need multoples of something (players), use a factory */

// Global variables

const X_CLASS = 'x';
const O_CLASS = 'o';
let aiTurn = false;

// This board is for the minimax algorithm
let board = [" ", " ", " ", " ", " ", " ", " ", " ", " "]; 
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

        let board = [" ", " ", " ", " ", " ", " ", " ", " ", " "]; // set the board back to beingempty
        
        cellElements[i].addEventListener('click', game, {
            once: true
        }) // once true prevents unwanted change
    }

}


function game(e) {

    cell = e.target;
    console.log(board);

    playersTurn(cell);

    if (checkWinner(currentClass) == -1) {
        console.log('The player has won');
        const winningMessage_div = document.querySelector(".winning-message");
        winningMessage_div.style.display = 'flex';
    }
    else if (checkWinner(currentClass) == 1) {
        console.log('The AI has won');
        const winningMessage_div = document.querySelector(".winning-message");
        winningMessage_div.style.display = 'flex';
    }



    

    aiDecision(cellElements);
    
    if (checkWinner(currentClass) == -1) {
        console.log('The player has won');
        const winningMessage_div = document.querySelector(".winning-message");
        winningMessage_div.style.display = 'flex';
    }
    else if (checkWinner(currentClass) == 1) {
        console.log('The AI has won');
        const winningMessage_div = document.querySelector(".winning-message");
        winningMessage_div.style.display = 'flex';
    }

}

function playersTurn(cell){

    // getting the ID of the cell for the board
    let playerChoiceNo = (cell.id).charCodeAt(0) - 97;
    board[playerChoiceNo] = 'x'

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



function restart() {
    const winningMessage_div = document.querySelector(".winning-message");
    winningMessage_div.style.display = 'none';
    startGame();
}


function aiDecision(cellElements){
    // debugger;
    currentClass = O_CLASS;
    let bestScore = -Infinity;
    let bestMove;

    cellElements.forEach(cell => {
        if (available(cell)){
            placeMark(cell, O_CLASS); // temporarily placing a cell there for the minimax algo.
            let score = minimax(cellElements, cell, 0, true);
            cell.classList.remove('o');
            if (score > bestScore){
                bestScore = score
                bestMove = cell;
            }
        }
    })
    
    placeMark(bestMove, O_CLASS);


}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

let scores = {
    'X': -1, // Human wins
    'O': 1, // AI wins
    'tie': 0
}

function checkWinner(currentClass) {
    let result = winningCombination.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        })
    })

    if (result && currentClass == X_CLASS){
        return -1; // human wins
    }
    else if (result && currentClass == X_CLASS){
        return 1; // AI wins
    }
    else{
        return 0;
    }
}


// if "isMaxing" = true, it means that the first move is the move we are optimizing for
function minimax(cellElements, cell, depth, isMaxing){
    let testResult = checkWinner(currentClass); // we will only be maxing for the O_Class
    
    // Terminal state
    if (testResult = 1){ // if the ai wins
        return 1; // then take the move cause it will mean the ai won
    }

    if (isMaximizing){
        let bestScore = -Infinity;
        if(available(cell)){
            let score = minimax(cellElements, cell, 0, false);
            cell.classList.remove('o');
            if (score > bestScore){
                bestScore = score
                bestMove = cell;
            }
        }
        return bestScore;
    }
    else {
        let bestScore = Infinity;
        if(available(cell)){
            let score = minimax(cellElements, cell, 0, false);
            cell.classList.remove('x');
            if (score < bestScore){
                bestScore = score
                bestMove = cell;
            }
        }
        return bestScore;
    }


}

startGame();
reset_button.addEventListener("click", restart); // remove paran


// This is the old check winner
// function checkWinner(currentClass) {
//     // see if we have atleast got a single winning combination
//     return winningCombination.some(combination => {
//         return combination.every(index => {
//             return cellElements[index].classList.contains(currentClass);
//         })
//     })
// }