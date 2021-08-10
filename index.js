const body = document.querySelector('body');
const clearBtn = document.querySelector('#clear');
const divContainer = document.createElement('div');

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
        div.style.backgroundColor = '#fff';
        divContainer.appendChild(div);
    }

    divContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    divContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;
}

function draw() {
    const squares = document.querySelectorAll('.square');

    squares.forEach((square) => {
        let opacity = 0;

        square.addEventListener('mouseenter', () => {
            let currentColor = square.style.backgroundColor;
            let [r, g, b] = currentColor.match(/[\d\.]+/g);
            currentColor = `${r}, ${g}, ${b}`;

            if (newColor === '255, 255, 255') {
                if (opacity === 0) {
                    opacity = 0;
                } else {
                    opacity = opacity - 10;
                }
                square.style.backgroundColor = `
                        rgba(${currentColor}, ${opacity}%)`;
                square.style.borderColor = `rgba(245, 245, 245, 0.1)`;
            } else {
                if (newColor !== currentColor) {
                    opacity = 0;
                }

                if (opacity === 100) {
                    opacity = 100;
                } else {
                    opacity = opacity + 10;
                }

                square.style.backgroundColor = `
                        rgba(${newColor}, ${opacity}%)`;
                square.style.borderColor = `rgba(${newColor}, 0.1)`;
            }
        });
    });
}

clearBtn.addEventListener('click', () => {
    let newGridSize = parseInt(
        prompt('Set the number of squares per side (up to 100):')
    );

    if (newGridSize > 0 && newGridSize <= 100) {
        createGrid(newGridSize);
        draw();
    }
});

const main = document.querySelector('main');

divContainer.classList.add('container');
main.appendChild(divContainer);

const colors = document.querySelectorAll('.color');
let newColor = '0, 0, 0';

colors.forEach((color) => {
    color.style.backgroundColor = `${color.id}`;
    color.addEventListener('click', () => {
        newColor = window
            .getComputedStyle(color, null)
            .getPropertyValue('background-color')
            .slice(4, -1);
    });
});

createGrid(16);
draw();
