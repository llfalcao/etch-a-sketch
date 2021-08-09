const body = document.querySelector('body');
const clearBtn = document.querySelector('#clear');
const divContainer = document.createElement('div');
let lastKnownSize = 0;

function createGrid(size) {
    const squaredSize = Math.pow(size, 2);
    const sqLastKnownSize = Math.pow(lastKnownSize, 2);

    let sizeDif = squaredSize - sqLastKnownSize;

    if (sizeDif > 0) {
        let squareId = sqLastKnownSize;
        for (let i = 1; i <= sizeDif; i++) {
            const div = document.createElement('div');
            div.id = `square-${++squareId}`;
            div.classList.add('square');
            div.style.backgroundColor = 'white';
            divContainer.appendChild(div);
        }
    } else if (sizeDif < 0) {
        sizeDif = sizeDif * -1;
        let squareId = sqLastKnownSize;
        for (let i = 0; i < sizeDif; i++) {
            const div = document.querySelector(`#square-${squareId--}`);
            div.remove();
        }
    }

    divContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    divContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    lastKnownSize = size;
}

function clearCanvas() {
    const squares = document.querySelectorAll('.square');
    squares.forEach((square) => {
        square.style.backgroundColor = 'white';
    });
}

function draw() {
    const squares = document.querySelectorAll('.square');
    const colors = document.querySelectorAll('.color');
    let currentColor = 'black';

    colors.forEach((color) => {
        color.style.backgroundColor = `${color.id}`;
        color.addEventListener('click', () => {
            currentColor = color.style.backgroundColor;
        });
    });

    squares.forEach((square) => {
        let opacity = 0;

        square.addEventListener('mouseover', () => {
            if (currentColor !== square.style.backgroundColor) {
                opacity = 0;
            }

            if (opacity === 100) {
                opacity = 100;
            } else {
                opacity = opacity + 10;
            }

            square.style.backgroundColor = currentColor;
            square.style.opacity = `${opacity}%`;
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
        clearCanvas();
        createGrid(newGridSize);
        draw();
    }
});

divContainer.classList.add('container');
body.appendChild(divContainer);

createGrid(16);
draw();
