const SLIDER = document.getElementsByClassName('slider')[0];
const GRID = document.getElementsByClassName('grid-container')[0]
let LENGTH = parseInt(SLIDER.value)

// Constants for maze tranisitions
const TIME = 10; // Delay between each step
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
    if (box.visited) {
        box.classList.remove('grid-item-visited');
    }
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
            // bottom corner right
            if ((row == (LENGTH - 1)) && (col == (LENGTH -1))) { 
                console.log('Completed Binary');
            }
            // Last row
            else if (row == (LENGTH -1)) {
                await removeBoxSide(i, boxes, RIGHT);
            }
            // Last column
            else if (col == (LENGTH - 1)) {
                await removeBoxSide(i, boxes, BOTTOM);
            }
            // Else
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

const generateAldousBroder = async () =>{
    const boxes = GRID.children

    const random = () => Math.floor((Math.random() * 4) + 0)

    const getNeighbourBox = (row,col, dir) => {
        // North
        if (dir == TOP) {
            return (row != 0) ? boxes[i-LENGTH] : null;
        }
        // East
        else if (dir == RIGHT) {
            return (col != LENGTH-1) ? boxes[i+1] : null;
        }
        // South
        else if (dir == BOTTOM) {
            return (row != LENGTH-1) ? boxes[i+LENGTH] : null;

        }
        // West 
        else if (dir == LEFT) {
            return (col != 0) ? boxes[i-1] : null;
        }
    }

    const carvePath = async (i, dir) => {
        if (dir == TOP) {
            await removeBoxSide(i, boxes, TOP);
        }
        else if (dir == RIGHT) {
            await removeBoxSide(i, boxes, RIGHT);
        }
        else if (dir == BOTTOM) {
            await removeBoxSide(i, boxes, BOTTOM);
        }
        else if (dir == LEFT) {
            await removeBoxSide(i, boxes, LEFT);
        }
    }

    let unvisted = LENGTH*LENGTH;
    let i = 0

    let box = boxes[i]
    box.visited = true
    unvisted = unvisted - 1

    while (unvisted > 0) { 
        
        let [row, col] = [Math.floor(i/LENGTH), i % LENGTH];

        // Highlight current box
        await colorBox(box, true);

        // Travel random direction
        let randomDir = random();

        // Get the box of neighbour traveled to.
        neighbourBox = getNeighbourBox(row, col, randomDir);
        
        if ((neighbourBox != null)) {
            
            if (!neighbourBox.visited) {
                await carvePath(i, randomDir);
                neighbourBox.visited = true;
                unvisted -= 1;
            }
            
            if (randomDir == TOP) {
                i = i - LENGTH;
            }
            else if (randomDir == BOTTOM) {
                i = i+LENGTH;
            }
            else if (randomDir == LEFT) {
                i -= 1;
            }
            else {
                i+=1;
            }

        }
        await colorBox(box, false);
        box = neighbourBox == null ? box : neighbourBox;
    }
    await colorBox(box, false);
    console.log('Completed AldousBroder');
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

