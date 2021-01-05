const SLIDER = document.getElementsByClassName('slider')[0];
const GRID = document.getElementsByClassName('grid-container')[0]
let LENGTH = parseInt(SLIDER.value)

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


const generateMazeBinary = () => {
    const boxes = GRID.children
    
    // Heads (0) = carve south, (1) Tails = carve East
    const random = () => Math.floor((Math.random() * 2) + 0)

    for (let i=0; i < boxes.length;i++) {
        let [row, col] = [Math.floor(i/LENGTH), i % LENGTH]
        let box = boxes[i]
        console.log(row, col, i)
        if (!box.visited) {
            box.visited = true
            if ((row == (LENGTH - 1)) && (col == (LENGTH -1))) {
                continue
            }
            else if (row == (LENGTH -1)) {
                box.classList.add('grid-item-no-right')
                let boxOnRight = boxes[i+1]
                boxOnRight.classList.add('grid-item-no-left')
            }
            else if (col == (LENGTH - 1)) {
                box.classList.add('grid-item-no-bottom')
                let boxBelow = boxes[i+LENGTH]
                boxBelow.classList.add('grid-item-no-top')
            }
            else {
                let carve = random() == 0 ? true : false
                box.classList.add(carve ? 'grid-item-no-bottom' : 'grid-item-no-right')
                let box2 = carve ? boxes[i+LENGTH] : boxes[i+1]
                box2.classList.add(carve ? 'grid-item-no-top' : 'grid-item-no-left')
            }
        }
    }
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
            console.log('GM', 2)
            break;
        case 'option3':
            console.log('GM', 3)
            break;
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
 * Makes a n x n bridge
 * @param {} n
 */
const makeGrid = (n) => {
    GRID.innerHTML=''
    GRID.style.gridTemplateRows = '1fr '.repeat(n)
    GRID.style.gridTemplateColumns = '1fr '.repeat(n)

    const applyCSS = (box, row, col) => {
        box.classList.add('grid-item')
        if (row == 0) {
            box.classList.add('grid-item-top')
        }
        if (col == 0) {
            box.classList.add('grid-item-left')
        }
        if (row == (n-1)) {
            box.classList.add('grid-item-bottom')
        }
        if (col == (n-1)) {
            box.classList.add('grid-item-right')
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

