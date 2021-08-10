const body = document.querySelector('body');
const clearBtn = document.querySelector('#clear');
const divContainer = document.createElement('div');
let lastKnownSize = 0;

function createGrid(size) {
    const squaredSize = Math.pow(size, 2);
    const squares = document.querySelectorAll('.square');

    squares.forEach((square) => {
        square.remove();
    });

    for (let i = 1; i <= squaredSize; i++) {
        const div = document.createElement('div');
        div.id = `square-${i}`;
        div.classList.add('square');
        div.style.backgroundColor = 'white';
        div.style.opacity = '0';
        divContainer.appendChild(div);
    }

    divContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    divContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;
}

function draw() {
    const squares = document.querySelectorAll('.square');
    const colors = document.querySelectorAll('.color');
    let newColor = 'black';

    colors.forEach((color) => {
        color.style.backgroundColor = `${color.id}`;
        color.addEventListener('click', () => {
            newColor = color.style.backgroundColor;
        });
    });

    squares.forEach((square) => {
        let opacity = 0;

        square.addEventListener('mouseenter', () => {
            if (newColor !== square.style.backgroundColor) {
                square.style.opacity = '0';
                opacity = 0;
            }
            if (opacity === 100) {
                opacity = 100;
            } else {
                opacity = opacity + 10;
            }

            square.style.backgroundColor = newColor;
            square.style.opacity = `${opacity / 100}`;
        });
    });
}

clearBtn.addEventListener('click', () => {
    let newGridSize = parseInt(
        prompt(
            'Please type the number of squares per side of the new canvas (up to 100):'
        )
    );

    if (newGridSize > 0 && newGridSize <= 100) {
        createGrid(newGridSize);
        draw();
    }
});

divContainer.classList.add('container');
body.appendChild(divContainer);

createGrid(16);
draw();
