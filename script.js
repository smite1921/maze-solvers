const SLIDER = document.getElementsByClassName('slider')[0];
const GRID = document.getElementsByClassName('grid-container')[0]
let LENGTH = parseInt(SLIDER.value)

// Constants for maze tranisitions
const TIME = 40; // Delay between each step
const LEFT = 0;
const TOP = 1;
const RIGHT = 2;
const BOTTOM = 3; 

/**
 * Makes grid responsive during window resizing
 */
window.onresize = () => {
    const width = window.getComputedStyle(GRID).getPropertyValue('width')
    GRID.style.height = width 
}

/**
 * Callback function for when slider value is changed. It creates a new grid
 * with the new value of the slider.
 */
SLIDER.oninput = () => {
    LENGTH = parseInt(SLIDER.value)
    makeGrid(LENGTH)
}

const delay = () => new Promise(resolve => setTimeout(resolve,TIME));

const colorBox = async (box, active) => {
    box.classList.add(active ? 'grid-item-active' : 'grid-item-visited');
    await delay();
}

const removeBoxSide = async (i, boxes, side) => {
    
    // We need to remove the border of the current box, and the one next to it
    let curBox = boxes[i];
    let adjaBox = undefined;

    let curBoxHighlightSide = null;
    let curBoxRemoveSide = null;
    let adjaBoxHighlightSide = null;
    let adjaBoxRemoveSide = null;

    switch (side) {
        case TOP:
            curBoxHighlightSide = 'grid-item-highlight-top';
            curBoxRemoveSide = 'grid-item-no-top';
            // We also have to remove the bottom border of the top box
            adjaBox = boxes[i-LENGTH];
            if (adjaBox != undefined) {
                adjaBoxHighlightSide = 'grid-item-highlight-bottom';
                adjaBoxRemoveSide = 'grid-item-no-bottom';
            }
            break;
        case BOTTOM:
            curBoxHighlightSide = 'grid-item-highlight-bottom'
            curBoxRemoveSide = 'grid-item-no-bottom'
            // We also have to remove the top border of the bottom box
            adjaBox = boxes[i+LENGTH];
            if (adjaBox != undefined) {
                adjaBoxHighlightSide = 'grid-item-highlight-top';
                adjaBoxRemoveSide = 'grid-item-no-top';
            }
            break;
        case LEFT:
            curBoxHighlightSide = 'grid-item-highlight-left'
            curBoxRemoveSide = 'grid-item-no-left'
            // We also have to remove the right border of the left box
            adjaBox = boxes[i-1];
            if (adjaBox != undefined) {
                adjaBoxHighlightSide = 'grid-item-highlight-right';
                adjaBoxRemoveSide = 'grid-item-no-right';
            }
            break;
        case RIGHT:
            curBoxHighlightSide = 'grid-item-highlight-right'
            curBoxRemoveSide = 'grid-item-no-right'
            // We also have to remove the left border of the right box
            adjaBox = boxes[i+1];
            if (adjaBox != undefined) {
                adjaBoxHighlightSide = 'grid-item-highlight-left';
                adjaBoxRemoveSide = 'grid-item-no-left';
            }
            break;
        default:
            break;
    }

    // Highlight the border to be removed
    curBox.classList.add(curBoxHighlightSide);
    if (adjaBox != undefined) {
        adjaBox.classList.add(adjaBoxHighlightSide)
    }
    await delay();

    // Remove the border
    curBox.classList.add(curBoxRemoveSide);
    if (adjaBox != undefined) {
        adjaBox.classList.add(adjaBoxRemoveSide)
    }
    await delay();
}

const generateMazeBinary = async () => {

    // We just need 1 second interval between each iteration.
    const boxes = GRID.children;
    
    // Heads (0) = carve south, (1) Tails = carve East
    const random = () => Math.floor((Math.random() * 2) + 0);

    for (let i=0; i < boxes.length;i++) {
        let [row, col] = [Math.floor(i/LENGTH), i % LENGTH];
        let box = boxes[i];
        await colorBox(box, true)
        if (!box.visited) {
            box.visited = true;
            if ((row == (LENGTH - 1)) && (col == (LENGTH -1))) { //corner right
                console.log('end');
            }
            else if (row == (LENGTH -1)) {
                await removeBoxSide(i, boxes, RIGHT);
            }
            else if (col == (LENGTH - 1)) {
                await removeBoxSide(i, boxes, BOTTOM);
            }
            else {
                await removeBoxSide(i, boxes,  (random() == 0) ? BOTTOM : RIGHT);
            }
        }
        await colorBox(box, false);
    }
}   

const generatePrims = () =>{
    const boxes = GRID.children
    
}

const generateAldousBroder = () =>{
    const boxes = GRID.children
    
    // (0) south, (1) north (2) east (3) west 
    let counter = LENGTH*LENGTH;
    let i = 0
    let box = boxes[i]
    box.visited = true
    counter = counter -1
    const random = () => Math.floor((Math.random() * 4) + 0)

    while(counter != 0){ 
        let [row, col] = [Math.floor(i/LENGTH), i % LENGTH]
        box = boxes[i]
        let r = random()
        if (r == 0){//down
            box = boxes[i+LENGTH]
            if (row == (LENGTH - 1)) {
                continue
            }
            if (!box.visited){
                box.visited = true
                box.classList.add('grid-item-no-top')
                let boxTop = boxes[i]
                boxTop.classList.add('grid-item-no-bottom')
                counter = counter - 1
                i = i + LENGTH
            }
            else{
                i = i+LENGTH
            }
        }
        else if (r == 1){ //top
            box = boxes[i-LENGTH]
            if (row == (0)){
                continue
            }
            if (!box.visited){
                box.visited = true
                box.classList.add('grid-item-no-bottom')
                let boxBottom = boxes[i]
                boxBottom.classList.add('grid-item-no-top')
                counter = counter - 1
                i = i-LENGTH
            }
            else{
                i = i-LENGTH
            }
        }
        else if (r == 2){ //right
            box = boxes[i+1]
            if (col == (LENGTH-1)){
                continue
            }
            if (!box.visited){
                box.visited = true
                box.classList.add('grid-item-no-left')
                let boxLeft = boxes[i]
                boxLeft.classList.add('grid-item-no-right')
                counter = counter - 1
                i = i+1
            }
            else{
                i = i+1
            }
        }
        else if (r == 3){ //left
            if (col == 0){
                continue
            }
            box = boxes[i-1]
            if (!box.visited){
                box.visited = true
                box.classList.add('grid-item-no-right')
                let boxRight = boxes[i]
                boxRight.classList.add('grid-item-no-left')
                counter = counter - 1
                i = i-1
            }
            else{
                i=i-1
            }
        }
        
    }

    

    /*
    initialize the box, (0th box) -> check visited
    while (counter != 0)
    random assigning either to get s,e,w,n
    if (s) -> box goes down, check if its unvisited -> remove border -> counter -1 
                                    if its visited -> pass


    */
        
}

/**
 * Callback function for generate maze form
 */
const generateMaze = () => {
    switch (document.getElementById('maze-gen').value) {
        case 'option1':
            console.log('Maze Generation - Binary', 1)
            generateMazeBinary()
            break;
        case 'option2':
            console.log('Maze Generation - Aldous-Broder', 2)
            generateAldousBroder()
            break;
        case 'option3':
            console.log('Maze Generation - Prims', 3)
            generatePrims();
        case 'option4':
            console.log('GM', 4)
            break;
        default:
            console.log('GM',null)
            break;
    }
}

/**
 * Callback function for solve maze form
 */
const solveMaze = () => {
    switch (document.getElementById('maze-solve').value) {
        case 'option1':
            console.log('SM', 1)
            break;
        case 'option2':
            console.log('SM', 2)
            break;
        case 'option3':
            console.log('SM', 3)
            break;
        case 'option4':
            console.log('SM', 4)
            break;
        default:
            console.log('SM',null)
            break;
    }
}

/**
 * Makes a n x n grid
 * @param {} n
 */
const makeGrid = (n) => {
    GRID.innerHTML=''
    GRID.style.gridTemplateRows = '1fr '.repeat(n);
    GRID.style.gridTemplateColumns = '1fr '.repeat(n);

    const applyCSS = (box, row, col) => {
        box.classList.add('grid-item');
        if (row == 0) {
            box.classList.add('grid-item-top');
        }
        if (col == 0) {
            box.classList.add('grid-item-left');
        }
        if (row == (n-1)) {
            box.classList.add('grid-item-bottom');
        }
        if (col == (n-1)) {
            box.classList.add('grid-item-right');
        }
    }

    for (let i=0;i<n*n;i++) {
        let [row, col] = [Math.floor(i/n), i % n]
        let gridBox = document.createElement('div')
        gridBox.visited = false
        applyCSS(gridBox, row, col)
        GRID.appendChild(gridBox)
    }
}

const width = window.getComputedStyle(GRID).getPropertyValue('width')
GRID.style.height = width 
makeGrid(LENGTH)

