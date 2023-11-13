document.addEventListener('DOMContentLoaded', function () {
    const ticTacToe = document.getElementById('tic-tac-toe');
    const winnerDisplay = document.getElementById('winner');
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    // Create the Tic Tac Toe grid
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', () => handleCellClick(cell));
        ticTacToe.appendChild(cell);
    }

    const cells = document.querySelectorAll('.cell');

    // Function to handle cell click
    function handleCellClick(cell) {
        const cellIndex = parseInt(cell.dataset.index);

        if (gameBoard[cellIndex] === '' && gameActive) {
            gameBoard[cellIndex] = currentPlayer;
            cell.textContent = currentPlayer;
            checkGameStatus();
            switchPlayer();
        }
    }

    // Function to check game status (win, draw, or ongoing)
    function checkGameStatus() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]              // Diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                gameActive = false;
                winnerDisplay.textContent = `${currentPlayer} wins!`;
                return;
            }
        }

        if (!gameBoard.includes('')) {
            gameActive = false;
            winnerDisplay.textContent = 'It\'s a draw!';
        }
    }

    // Function to switch players (X to O, O to X)
    function switchPlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
});
