document.addEventListener('DOMContentLoaded', () => {

    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const ScoreDisplay = document.querySelector('#score');
    const StartBtn = document.querySelector('#start-button')
    const width = 10;

    //The Tetrominoes
    const lTetromino = [
        [0, width, width*2, 1],
        [0, 1, 2, width+2],
        [1, width+1, width*2, width*2+1],
        [0, width, width+1, width+2]
    ]
    const zTetromino = [
        [0, width, width+1, width*2+1],
        [1, 2, width, width+1 ],
        [0, width, width+1, width*2+1],
        [1, 2, width, width+1]
    ]

    const tTetromino = [
        [1, width, width+1, width+2],
        [0, 1, 2, width+1],
        [0, width, width+1, width*2],
        [1,width, width+1, width*2+1]
    ]

    const oTetromino = [
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1]
    ]
    
    const iTetromino = [
        [0, width, width*2, width*3],
        [0, 1, 2, 3],
        [0, width, width*2, width*3],
        [0, 1, 2, 3]
    ]

    const theTetrominos = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];

    let currentPosition = 4;

    //radomly select a Tetromino and its first rotation
    let random = Math.floor(Math.random()*theTetrominos.length)
    let randomRotation = Math.floor(Math.random()*4)
    console.log(random);

    let current = theTetrominos[random][randomRotation];

    //draw the first rotation in the first te

    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino');
        })
    }

    function undraw(){
        current.forEach( index => {
            squares[currentPosition + index].classList.remove('tetromino');
        })
    }

    timerId = setInterval(moveDown, 1000)

    //moveDown Function
    function moveDown() {
        undraw();
        currentPosition += width;
        draw();
    }


})