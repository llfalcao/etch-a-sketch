const body = document.querySelector('body');
const clearBtn = document.querySelector('#clear');
const divContainer = document.createElement('div');

function removeGrid() {
    const divContainer = document.querySelector('.container');
    divContainer.remove();
}

function createGrid(size) {
    lastKnownSize = size;
    const divContainer = document.createElement('div');

    divContainer.classList.add('container');
    divContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    divContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    body.appendChild(divContainer);

    const squaredSize = size * size;

    for (let i = 1; i <= squaredSize; i++) {
        const div = document.createElement('div');
        div.id = `square-${i}`;
        div.classList.add('square');
        divContainer.appendChild(div);
    }
}

clearBtn.addEventListener('click', (e) => {
    const newGridSize = window.prompt(
        'Please type the number of squares per side of the new canvas:'
    );
    removeGrid();
    createGrid(newGridSize);
});

let lastKnownSize;
createGrid(16);
