// setup window resizing 
window.onresize = () => {
    const grid = document.getElementsByClassName('grid-container')[0]
    const width = window.getComputedStyle(grid).getPropertyValue('width')
    grid.style.height = width 
}

// setup slider
const slider = document.getElementsByClassName('slider')[0];
slider.oninput = () => {
    makeGrid(slider.value)
}

makeGrid = (size) => {
    grid.innerHTML=''
    grid.style.gridTemplateRows = '1fr '.repeat(size)
    grid.style.gridTemplateColumns = '1fr '.repeat(size)

    for (let i=0;i<size*size;i++) {
        let gridBox = document.createElement('div')
        gridBox.classList.add('grid-item')
        grid.appendChild(gridBox)
    }
}

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

// Make length and width equal 
const grid = document.getElementsByClassName('grid-container')[0]
const width = window.getComputedStyle(grid).getPropertyValue('width')
grid.style.height = width 
makeGrid(slider.value)

// Set grid container for 15 rows and 15 colums
