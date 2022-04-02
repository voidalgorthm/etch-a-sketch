const container = document.querySelector('.container');
const content = container.querySelector('.content');
/* panel */
const panel = content.querySelector('.panel');
const ctrlcanvas = panel.querySelector('.control#canvas');
const gcontainer = ctrlcanvas.querySelector('#slider-container');
const gslider = gcontainer.querySelector('#gsize');
const gval = gcontainer.querySelectorAll('span.gval');
/* canvas */
const canvas = document.querySelector('.canvas');

let size = gslider.getAttribute('value');
displayGrid(size);

gslider.oninput = function (e) {
  gval.forEach(val => {
    val.textContent = e.target.value;
  });
  size = e.target.value;
  clearGrid();
  displayGrid(size);
}

function displayGrid(size) {
  canvas.style.setProperty('--grid-rows', size);
  canvas.style.setProperty('--grid-cols', size);

  for (let index = 0; index < (size * size); index++) {
    let cell = document.createElement('div');
    canvas.appendChild(cell).className = "grid-cell";
  };
};

function clearGrid() {
  let display = canvas.querySelectorAll('.grid-cell');
  display.forEach(box => {
    box.remove();
  });
}

