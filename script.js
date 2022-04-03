/* general */
const root = document.documentElement;
const container = document.querySelector('.container');
const content = container.querySelector('.content');
/* panel */
const panel = content.querySelector('.panel');
const ctrlcanvas = panel.querySelector('.control#canvas');
const gcontainer = ctrlcanvas.querySelector('#slider-container');
const gslider = gcontainer.querySelector('#gsize');
const gval = gcontainer.querySelectorAll('span.gval');
const ctrlcolor = panel.querySelector('.control#color');
const cslider = ctrlcolor.querySelector('#cslider');
const cval = ctrlcolor.querySelector('#cval');

/* canvas */
const canvas = document.querySelector('.canvas');

let size = gslider.getAttribute('value');
displayGrid(size);
generateRainbow();

gslider.oninput = function (e) {
  gval.forEach(val => {
    val.textContent = e.target.value;
  });
  size = e.target.value;
  clearGrid();
  displayGrid(size);
}

cslider.oninput = function() {
  pickColor();
}

function generateRainbow() {
  let colors = [];
  for (let i = 0; i < 372; i++) {
    colors[i] = `hsl(${i}, 100%, 50%)`;
    if(i > 359) {
      colors[i] = `hsl(0, 100%, 50%)`;
    }
  }
  colors = colors.toString();
  root.style.setProperty("--colors", colors);
}

let colorValue;
function pickColor() {
  const rval = cslider.value;
  let outputColor;
  if(rval <= 360){
    outputColor = `hsl(${rval},100%,50%)`;
  } else {
    outputColor = `hsl(0,100%,50%)`;
  }
  cval.style.backgroundColor = outputColor;
  colorValue = Number(rval);
  // cval.textContent =
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

