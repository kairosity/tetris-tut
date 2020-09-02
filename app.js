document.addEventListener('DOMContentLoaded', () => {

    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const scoreDisplay = document.querySelector('#score');
    const startBtn = document.querySelector('#start-button')
    const width = 10;
    let nextRandom = 0;
    let timerId;

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

    //currentPosition starts at the top of the grid in the middle.
    let currentPosition = 4;

    //randomly select a Tetromino and its first rotation
    let random = Math.floor(Math.random()*theTetrominos.length)
    let currentRotation = 0;

    //this is a random tetromino  in a random rotation array - it moves down the grid until it lands and then there is a new current.
    let current = theTetrominos[random][currentRotation];

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

    //make the tet move down every second
    timerId = setInterval(moveDown, 1000)

    //assigns functions to keyCodes
    function control(e){
        if(e.keyCode === 37) {
            moveLeft();
        } else if (e.keyCode === 38){
            rotate();
        } else if(e.keyCode === 39){
            moveRight();
        } else if(e.keyCode === 40){
            //moveDown()
        }
    }

    document.addEventListener('keyup', control);

    //moveDown Function
    function moveDown() {
        undraw();
        currentPosition += width; //this is where the currentPosition changes as the tet moves down the grid.
        draw();
        freeze();
    }

    //freeze function
    function freeze() {
        if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))){ //if they are on last line of grid
            current.forEach(index => squares[currentPosition + index].classList.add('taken')) //add that class name to them so it also applies to the new ones above them.
            //start a new tetromino falling
            random = nextRandom;
            nextRandom = Math.floor(Math.random() * theTetrominos.length)
            current = theTetrominos[random][currentRotation]
            currentPosition = 4
            draw();
            displayShape();

        }
    }

    //move the tetromino left, unless it is at the edge or there is a blockage.

    function moveLeft(){
        undraw();
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0 ); //since the grid line columns start from: 0,10,20,30 etc... to 90 any of them modulo 10 will be 0
        
        //if it's not at the left edge then move the tet left.
        if(!isAtLeftEdge) currentPosition -=1; //seems like you can do an IF statement without {} -1 from its position will move the tet 1 square left.

        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))){
            currentPosition +=1
            
        }
        draw();
    }

    //move the tet right, unless it is at the right edge or there is a blockage

    function moveRight(){
        undraw();
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === 9);

        if(!isAtRightEdge) {
            currentPosition +=1;
        }
        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))){
            currentPosition -=1;
        }
        draw();
    }

    // function moveDown(){

    // }
    //function to rotate the tet
    function rotate(){
        undraw();
        currentRotation++;
        if(currentRotation === current.length){
            currentRotation = 0;
        }
        current = theTetrominos[random][currentRotation];
        draw();
    }
    //show up-next tets
    const displaySquares = document.querySelectorAll('.mini-grid div');
    const displayWidth = 4;
    let displayIndex = 0;
    

    //the Tets without rotations

    const upNextTetrominos = [
        [0, displayWidth, displayWidth*2, 1], //ltet
        [0, displayWidth, displayWidth+1, displayWidth*2+1], //ztet
        [1, displayWidth, displayWidth+1, displayWidth+2], //ttet
        [0,1, displayWidth, displayWidth+1], //otet
        [0, displayWidth, displayWidth*2, displayWidth*3] //itet
    ]

    //display the shape in the mini-grid display

    //this is where the randomness is chosen and then this is passed on to the shape falling. 
    function displayShape(){
        //remove tetromino class from mini-grid
        displaySquares.forEach(square => {
            square.classList.remove('tetromino');
        })
        upNextTetrominos[nextRandom].forEach( index => { //returns the same tet as called with start btn as nextRandom var is passed here.
            displaySquares[displayIndex + index].classList.add('tetromino'); //colours in the shape to create the tet.
        })
    }

    // add functionality to the button

    startBtn.addEventListener('click', ()=>{
        if (timerId) { //if the timer is on when the button is clicked then we want to pause the game.
            clearInterval(timerId); 
            timerId = null;
        } else {
            draw();
            timerId = setInterval(moveDown, 1000)
            nextRandom = Math.floor(Math.random()*theTetrominos.length) // gives a number from 0-4 to determine which tet to start with
            displayShape();//passes the info to the mini-grid to display the upcoming tets.
        }
    })


})