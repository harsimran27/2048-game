document.addEventListener("DOMContentLoaded", () => {
    const gridDisplay = document.querySelector(".grid");
    const scoreDisplay = document.querySelector(".score");
    const resultDisplay = document.querySelector(".result");

    let width = 4;
    let squares = [];

    function createBoard() {
        for (let i = 0; i < width * width; i++) {
            let square = document.createElement('div');
            square.classList.add("grid-small-squares-box");
            square.innerHTML = 0;
            gridDisplay.append(square);
            squares.push(square);
        }
    }

    createBoard();

})