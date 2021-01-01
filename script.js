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

// Make length and width equal 
const grid = document.getElementsByClassName('grid-container')[0]
const width = window.getComputedStyle(grid).getPropertyValue('width')
grid.style.height = width 
makeGrid(slider.value)

// Set grid container for 15 rows and 15 colums
