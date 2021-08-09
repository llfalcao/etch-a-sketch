const body = document.querySelector('body');
console.log(body);

const divContainer = document.createElement('div');
divContainer.classList.add('container');
body.appendChild(divContainer);

for (let i = 1; i <= 256; i++) {
    const div = document.createElement('div');
    div.id = `square-${i}`;
    div.classList.add('square');
    divContainer.appendChild(div);
}
