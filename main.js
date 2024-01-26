document.addEventListener("DOMContentLoaded", () => {
    const gridDisplay = document.querySelector('.grid');
    const scoreDisplay = document.querySelector('#score');
    const resultDisplay = document.querySelector('#result');
    let squares = [];
    const width = 4;
    let score = 0;

    function createBoard() {
        for (let i = 0; i < width * width; i++) {
            const square = document.createElement('div');
            square.innerHTML = 0;
            gridDisplay.appendChild(square);
            squares.push(square);
        }
        generate();
        generate();
    }
    createBoard();

    function generate() {
        const randomNumber = Math.floor(Math.random() * squares.length);
        if (squares[randomNumber].innerHTML == 0) {
            squares[randomNumber].innerHTML = Math.random() < 0.9 ? 2 : 4;
            checkForGameOver();
        } else {
            generate();
        }
    }

    function moveRight() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i + 1].innerHTML;
                let totalThree = squares[i + 2].innerHTML;
                let totalFour = squares[i + 3].innerHTML;
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

                let filterRow = row.filter(num => num);
                let missing = 4 - filterRow.length;
                let zeros = Array(missing).fill(0);
                let newRow = zeros.concat(filterRow.reverse());

                squares[i].innerHTML = newRow[0];
                squares[i + 1].innerHTML = newRow[1];
                squares[i + 2].innerHTML = newRow[2];
                squares[i + 3].innerHTML = newRow[3];
            }
        }
    }

    function moveLeft() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i + 1].innerHTML;
                let totalThree = squares[i + 2].innerHTML;
                let totalFour = squares[i + 3].innerHTML;
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

                let filterRow = row.filter(num => num);
                let missing = 4 - filterRow.length;
                let zeros = Array(missing).fill(0);
                let newRow = filterRow.concat(zeros);

                squares[i].innerHTML = newRow[0];
                squares[i + 1].innerHTML = newRow[1];
                squares[i + 2].innerHTML = newRow[2];
                squares[i + 3].innerHTML = newRow[3];
            }
        }
    }

    function moveUp() {
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML;
            let totalTwo = squares[i + width].innerHTML;
            let totalThree = squares[i + (width * 2)].innerHTML;
            let totalFour = squares[i + (width * 3)].innerHTML;
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

            let filteredColumn = column.filter(num => num);
            let missing = 4 - filteredColumn.length;
            let zeros = Array(missing).fill(0);
            let newColumn = filteredColumn.concat(zeros.reverse());

            squares[i].innerHTML = newColumn[0];
            squares[i + width].innerHTML = newColumn[1];
            squares[i + (width * 2)].innerHTML = newColumn[2];
            squares[i + (width * 3)].innerHTML = newColumn[3];
        }
    }

    function moveDown() {
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML;
            let totalTwo = squares[i + width].innerHTML;
            let totalThree = squares[i + (width * 2)].innerHTML;
            let totalFour = squares[i + (width * 3)].innerHTML;
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

            let filteredColumn = column.filter(num => num);
            let missing = 4 - filteredColumn.length;
            let zeros = Array(missing).fill(0);
            let newColumn = filteredColumn.concat(zeros);

            squares[i].innerHTML = newColumn[0];
            squares[i + width].innerHTML = newColumn[1];
            squares[i + (width * 2)].innerHTML = newColumn[2];
            squares[i + (width * 3)].innerHTML = newColumn[3];
        }
    }

    function combineRow() {
        for (let i = 0; i < 15; i++) {
            if (squares[i].innerHTML === squares[i + 1].innerHTML) {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
                squares[i].innerHTML = combinedTotal;
                squares[i + 1].innerHTML = 0;
                score += combinedTotal;
                scoreDisplay.innerHTML = score;
                squares[i + 1].style.backgroundColor = getColor(combinedTotal);
            }
        }
    }

    function control(e) {
        if (e.keyCode === 37) {
            keyLeft();
        } else if (e.keyCode === 38) {
            keyUp();
        } else if (e.keyCode === 39) {
            keyRight();
        } else if (e.keyCode === 40) {
            keyDown();
        }
    }

    document.addEventListener('keyup', control);

    function keyRight() {
        moveRight();
        combineRow();
        moveRight();
        generate();
        addColors();
        checkForWin();
    }

    function keyLeft() {
        moveLeft();
        combineRow();
        moveLeft();
        generate();
        addColors();
        checkForWin();
    }

    function keyUp() {
        moveUp();
        combineRow();
        moveUp();
        generate();
        addColors();
        checkForWin();
    }

    function keyDown() {
        moveDown();
        combineRow();
        moveDown();
        generate();
        addColors();
        checkForWin();
    }

    function checkForWin() {
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 2048) {
                resultDisplay.innerHTML = "You Won!";
                document.removeEventListener('keyup', control);
                clear();
            }
        }
    }

    function checkForGameOver() {
        let zeros = 0;
        for (let i = 0; i < squares.length; i++) {
            squares[i].style.color = 'white';
            if (squares[i].innerHTML == 0) {
                zeros++;
                squares[i].style.color = '#afa192';
            } else if (squares[i].innerHTML == 2 || squares[i].innerHTML == 4) {
                squares[i].style.color = '#afa192';
            }
        }

        if (zeros === 0) {
            resultDisplay.innerHTML = 'Game Over';
            document.removeEventListener('keyup', control);
            clear();
        }
    }

    function clear() {
        clearInterval(myTimer);
    }

    function addColors() {
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 0) squares[i].style.backgroundColor = '#afa192';
            else if (squares[i].innerHTML == 2) squares[i].style.backgroundColor = '#EFE5DB';
            else if (squares[i].innerHTML == 4) squares[i].style.backgroundColor = '#EFE2CF';
            else if (squares[i].innerHTML == 8) squares[i].style.backgroundColor = '#F5996A';
            else if (squares[i].innerHTML == 16) squares[i].style.backgroundColor = '#F89868';
            else if (squares[i].innerHTML == 32) squares[i].style.backgroundColor = '#F77F5C';
            else if (squares[i].innerHTML == 64) squares[i].style.backgroundColor = '#F65E3B';
            else if (squares[i].innerHTML == 128) squares[i].style.backgroundColor = '#EDCF72';
            else if (squares[i].innerHTML == 256) squares[i].style.backgroundColor = '#EDCB5C';
            else if (squares[i].innerHTML == 512) squares[i].style.backgroundColor = '#EDD277';
            else if (squares[i].innerHTML == 1024) squares[i].style.backgroundColor = '#EFCF6C';
            else if (squares[i].innerHTML == 2048) squares[i].style.backgroundColor = '#EACF5B';
        }
    }

    function getColor(num) {
        if (num == 2) return '#EFE5DB';
        else if (num == 4) return '#EFE2CF';
        else if (num == 8) return '#F5996A';
        else if (num == 16) return '#F89868';
        else if (num == 32) return '#F77F5C';
        else if (num == 64) return '#F65E3B';
        else if (num == 128) return '#EDCF72';
        else if (num == 256) return '#EDCB5C';
        else if (num == 512) return '#EDD277';
        else if (num == 1024) return '#EFCF6C';
        else if (num == 2048) return '#EACF5B';
    }

    let myTimer = setInterval(addColors, 50);
});