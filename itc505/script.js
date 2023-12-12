document.addEventListener("DOMContentLoaded", function () {
    const board = document.getElementById("board");
    const resetButton = document.createElement("button");
    const movesDisplay = document.createElement("p"); // Added for displaying the moves count
    let movesCount = 0; // Variable to track moves count

    resetButton.textContent = "Reset";
    resetButton.addEventListener("click", resetBoard);

    const gridSize = 5;

    function initializeBoard() {
        for (let i = 0; i < gridSize * gridSize; i++) {
            const square = document.createElement("div");
            square.classList.add("square");
            square.dataset.index = i;
            square.addEventListener("click", () => {
                toggleSquare(square);
                updateMovesCount();
            });
            board.appendChild(square);
        }

        // Append the reset button and moves display to the container
        document.getElementById("container").appendChild(resetButton);
        document.getElementById("container").appendChild(movesDisplay);

        randomizeBoard();
    }

    function randomizeBoard() {
        for (let i = 0; i < gridSize * gridSize; i++) {
            if (Math.random() > 0.5) {
                toggleSquare(board.children[i]);
                updateMovesCount(); // Increment moves count for each randomization
            }
        }
    }

    function toggleSquare(square) {
        const row = Math.floor(square.dataset.index / gridSize);
        const col = square.dataset.index % gridSize;

        // Toggle the clicked square
        square.classList.toggle("is-off");

        // Toggle the immediate neighbors
        toggleCell(row, col - 1); // left
        toggleCell(row, col + 1); // right
        toggleCell(row - 1, col); // top
        toggleCell(row + 1, col); // bottom

        checkWin();
    }

    function toggleCell(row, col) {
        if (row >= 0 && row < gridSize && col >= 0 && col < gridSize) {
            const index = row * gridSize + col;
            board.children[index].classList.toggle("is-off");
        }
    }

    function checkWin() {
        const blackSquares = Array.from(board.children).filter(square =>
            square.classList.contains("is-off")
        );

        if (blackSquares.length === gridSize * gridSize) {
            window.alert("You win!");
            resetBoard();
        }
    }

    function resetBoard() {
        Array.from(board.children).forEach(square => {
            square.classList.remove("is-off");
        });
        randomizeBoard();
        movesCount = 0; // Reset moves count
        updateMovesCount();
    }

    function updateMovesCount() {
        movesCount++;
        movesDisplay.textContent = `Moves Count: ${movesCount}`;
    }

    initializeBoard();
});
