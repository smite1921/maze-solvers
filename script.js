const SLIDER = document.getElementsByClassName('slider')[0];
let LENGTH = SLIDER.value

/**
 * Callback function for generate maze form
 */
const generateMaze = () => {
    switch (document.getElementById('maze-gen').value) {
        case 'option1':
            console.log('GM', 1)
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
 * Makes grid responsive during window resizing
 */
window.onresize = () => {
    const grid = document.getElementsByClassName('grid-container')[0]
    const width = window.getComputedStyle(grid).getPropertyValue('width')
    grid.style.height = width 
}

/**
 * Callback function for when slider value is changed. It creates a new grid
 * with the new value of the slider.
 */
SLIDER.oninput = () => {
    LENGTH = SLIDER.value
    makeGrid(LENGTH)
}

/**
 * Makes a n x n bridge
 * @param {} n
 */
const makeGrid = (n) => {
    grid.innerHTML=''
    grid.style.gridTemplateRows = '1fr '.repeat(n)
    grid.style.gridTemplateColumns = '1fr '.repeat(n)

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
        applyCSS(gridBox, row, col)
        grid.appendChild(gridBox)
    }
}

const grid = document.getElementsByClassName('grid-container')[0]
const width = window.getComputedStyle(grid).getPropertyValue('width')
grid.style.height = width 
makeGrid(LENGTH)

