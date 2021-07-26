/*
Factory function: 
- player 

Modules:
- gameBoard
- displayController
- gameController
*/

// Factory function
const player = (sign) => {
    this.sign = sign;

    const getSign = () => {
        // Bug: If I do this.sign here it still works but it wont change sign
        return sign;
    }

    const getMessage = () => {
        return `Player ${sign.toUpperCase()}'s Turn`;
    }

    const getWinner = () => {
        return `Player ${sign.toUpperCase()} Won`;
    }

    return {
        getSign,
        getMessage,
        getWinner
    };

}

// Module function
const gameBoard = (() => {
   
    const cells = document.querySelectorAll('.cell');
    const cellElements = Array.from(document.querySelectorAll('.cell'));

    return {
        cells,
        cellElements,
        // reset
    };
})();


// Module function
const displayController = (() => {

    // facilitates restart button
    const restart_button = document.querySelector("#restart");
    console.log(restart_button);

    restart_button.addEventListener('click', function () {
        gameBoard.cells.forEach(singleCell => {
            // console.log(gameController.getPlayers()[0]);
            singleCell.classList.remove(gameController.getPlayers()[0].getSign());
            singleCell.classList.remove(gameController.getPlayers()[1].getSign());
        })

        const winningMessage_div = document.querySelector(".winning-message");
        winningMessage_div.style.display = 'none';

        gameController.resetIsOver();
        // console.log(gameController.isGameOver())
        gameController.resetCurrentPlayer();
    })


    // facilitates everything else

    gameBoard.cells.forEach(singleCell => {
        singleCell.addEventListener('click', function handleCellClick(e) {
            if (!e || !e.currentTarget) {
                return;
            }

            // Prevents user from double clicking
            e.currentTarget.removeEventListener(e.type, handleCellClick);

            if (!gameController.isGameOver()) {

                
                const currentPiece = gameController.getCurrentPiece();
                addToBoard(e.currentTarget, currentPiece);
                const winner = gameController.checkWinner(currentPiece);

                if (winner) {
                    showMessage(gameController.getWinner());
                    const winningMessage_div = document.querySelector(".winning-message");
                    winningMessage_div.style.display = 'flex';
                    

                    gameController.setOver();
                    // console.log(gameController.isGameOver())
                    // gameController.isOver = true; // when can I do this?


                } else {
                    showMessage(gameController.getTurnMessage());
                    gameController.switchPlayer();
                }

            }
        })
    })

    const addToBoard = (cell, currentPiece) => {
        console.log("hello");
        cell.classList.add(currentPiece);
    };

    const showMessage = (message) => {
        console.log(message);
    }

})();

// Module
const gameController = (() => {

    const players = [
        player("x"), player("o")
    ];

    let currentPlayer = 0;
    let isOver = false;

    let winningCombination = [
        [0, 1, 2], // horizontal
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6], // vertical
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8], // diagonal
        [2, 4, 6]
    ];

    const setOver = () => {
        isOver = true;
    }

    const resetIsOver = () => {
        isOver = false;
    }

    const resetCurrentPlayer = () => {
        currentPlayer = 0;
    }

    const getPlayers = () => {
        return players;
    }

    const getCurrentPiece = () => {
        return players[currentPlayer].getSign();
    }

    const getWinner = () => {
        return players[currentPlayer].getWinner();
    }

    const getTurnMessage = () => {
        return players[currentPlayer].getMessage();
    }

    const switchPlayer = () => {
        currentPlayer = currentPlayer === 1 ? 0 : 1;
    }

    const checkWinner = (currentClass) => {
        return winningCombination.some(combination => {
            return combination.every(index => {
                return gameBoard.cellElements[index].classList.contains(currentClass);
            })
        })
    };

    const isGameOver = () => {
        return isOver;
    }


    return {
        isGameOver,
        checkWinner,
        // reset,
        getCurrentPiece,
        switchPlayer,
        getWinner,
        getTurnMessage,
        getPlayers,
        resetCurrentPlayer,
        resetIsOver,
        setOver
    }
})();

