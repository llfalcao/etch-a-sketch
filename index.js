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

clearBtn.addEventListener('click', (e) => {
    let newGridSize = window.prompt(
        'Please type the number of squares per side of the new canvas:'
    );
    if (newGridSize !== null && newGridSize !== '') {
        createGrid(newGridSize);
    }
});

divContainer.classList.add('container');
body.appendChild(divContainer);

createGrid(16);
