document.addEventListener("DOMContentLoaded", () => {
    const gridDisplay = document.querySelector(".grid");
    const scoreDisplay = document.querySelector(".score");
    const resultDisplay = document.querySelector(".result");

    let width = 4;
    let squares = [];
    let score = 0;
    let square;


    function createBoard() {
        for (let i = 0; i < width * width; i++) {
            square = document.createElement('div');
            square.classList.add("grid-small-squares-box");
            square.innerHTML = 0;
            gridDisplay.append(square);
            squares.push(square);
        }

        generate();
        generate();
    }

    createBoard();

    function generate() {
        let randomNumbers = Math.floor(Math.random() * squares.length);
        if (squares[randomNumbers].innerHTML == 0) {
            squares[randomNumbers].innerHTML = 2;
            checkForLose();
        } else {
            generate();
        }
    }


    //move grid to right
    function moveRight() {
        for (let i = 0; i < width * width; i++) {
            if (i % 4 === 0) {
                let firstVal = squares[i].innerHTML;
                let secondVal = squares[i + 1].innerHTML;
                let thirdVal = squares[i + 2].innerHTML;
                let fourthVal = squares[i + 3].innerHTML;

                let row = [parseInt(firstVal), parseInt(secondVal), parseInt(thirdVal), parseInt(fourthVal)];

                let filteredRow = row.filter(num => num);
                let missing = width - filteredRow.length;
                let zeroes = Array(missing).fill(0);
                let newRow = zeroes.concat(filteredRow);

                squares[i].innerHTML = newRow[0];
                squares[i + 1].innerHTML = newRow[1];
                squares[i + 2].innerHTML = newRow[2];
                squares[i + 3].innerHTML = newRow[3];
            }
        }
    }

    // move grid to left
    function moveLeft() {
        for (let i = 0; i < width * width; i++) {
            if (i % 4 === 0) {
                let firstVal = squares[i].innerHTML;
                let secondVal = squares[i + 1].innerHTML;
                let thirdVal = squares[i + 2].innerHTML;
                let fourthVal = squares[i + 3].innerHTML;

                let row = [parseInt(firstVal), parseInt(secondVal), parseInt(thirdVal), parseInt(fourthVal)];

                let filteredRow = row.filter(num => num);
                let missing = width - filteredRow.length;
                let zeroes = Array(missing).fill(0);
                let newRow = filteredRow.concat(zeroes);

                squares[i].innerHTML = newRow[0];
                squares[i + 1].innerHTML = newRow[1];
                squares[i + 2].innerHTML = newRow[2];
                squares[i + 3].innerHTML = newRow[3];
            }
        }
    }

    function moveDown() {
        for (let i = 0; i < width; i++) {

            let firstVal = squares[i].innerHTML;
            let secondVal = squares[i + width].innerHTML;
            let thirdVal = squares[i + (width * 2)].innerHTML;
            let fourthVal = squares[i + (width * 3)].innerHTML;

            let column = [parseInt(firstVal), parseInt(secondVal), parseInt(thirdVal), parseInt(fourthVal)];

            let filteredCol = column.filter(num => num);
            let missing = width - filteredCol.length;
            let zeroes = Array(missing).fill(0);
            let newColumn = zeroes.concat(filteredCol);

            squares[i].innerHTML = newColumn[0];
            squares[i + width].innerHTML = newColumn[1];
            squares[i + (width * 2)].innerHTML = newColumn[2];
            squares[i + (width * 3)].innerHTML = newColumn[3];

        }
    }

    function moveUp() {
        for (let i = 0; i < width; i++) {

            let firstVal = squares[i].innerHTML;
            let secondVal = squares[i + width].innerHTML;
            let thirdVal = squares[i + (width * 2)].innerHTML;
            let fourthVal = squares[i + (width * 3)].innerHTML;

            let column = [parseInt(firstVal), parseInt(secondVal), parseInt(thirdVal), parseInt(fourthVal)];

            let filteredCol = column.filter(num => num);
            let missing = width - filteredCol.length;
            let zeroes = Array(missing).fill(0);
            let newColumn = filteredCol.concat(zeroes);

            squares[i].innerHTML = newColumn[0];
            squares[i + width].innerHTML = newColumn[1];
            squares[i + (width * 2)].innerHTML = newColumn[2];
            squares[i + (width * 3)].innerHTML = newColumn[3];

        }
    }

    function combineRow() {
        for (let i = 0; i < 15; i++) {
            if (squares[i].innerHTML == squares[i + 1].innerHTML) {
                let combineTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
                squares[i].innerHTML = combineTotal;
                squares[i + 1].innerHTML = 0;
                score += combineTotal;
                scoreDisplay.innerHTML = score;

            }
        }
        checkForWin();
    }

    function combineColumn() {
        for (let i = 0; i < 12; i++) {
            if (squares[i].innerHTML == squares[i + width].innerHTML) {
                let combineTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML);
                squares[i].innerHTML = combineTotal;
                squares[i + width].innerHTML = 0;
                score += combineTotal;
                scoreDisplay.innerHTML = score;


            }
        }
        checkForWin();
    }

    function control(e) {
        if (e.keyCode === 39) {
            keyRight();
        } else if (e.keyCode === 37) {
            keyLeft();
        } else if (e.keyCode === 38) {
            keyUp();
        } else if (e.keyCode === 40) {
            keyDown();
        }
    }

    document.addEventListener("keyup", control);

    function keyRight() {
        moveRight();
        combineRow();
        moveRight();
        generate();
    }

    function keyLeft() {
        moveLeft();
        combineRow();
        moveLeft();
        generate();
    }

    function keyDown() {
        moveDown();
        combineColumn();
        moveDown();
        generate();
    }

    function keyUp() {
        moveUp();
        combineColumn();
        moveUp();
        generate();
    }

    function checkForWin() {
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 2048) {
                resultDisplay.innerHTML = "You Win👍";
                document.removeEventListener("keyup", control);
            }
        }
    }

    function checkForLose() {
        let zeroes = 0;
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 0) {
                zeroes++;
            }
        }
        if (zeroes === 0) {
            resultDisplay.innerHTML = "You Lose👎";
            document.removeEventListener("keyup", control);
        }
    }



})
