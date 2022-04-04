/* general */
const root = document.documentElement;
const container = document.querySelector('.container');
const content = container.querySelector('.content');
/* panel */
const panel = content.querySelector('.panel');
/* control canvas */
const controlCanvas = panel.querySelector('.control#canvas');
const gridContainer = controlCanvas.querySelector('#gslider');
const gridSlider = gridContainer.querySelector('#gsize');
const gridValue = gridContainer.querySelectorAll('span.gval');
/* control color */
const controlColor = panel.querySelector('.control#color');
const colorSlider = controlColor.querySelector('#cslider');
const select = controlColor.querySelector('#select');
const leftSelect = select.querySelector('#cselect1');
const rightSelect = select.querySelector('#cselect2');
const colorValue = controlColor.querySelector('#cval');
/* control tools */

/* canvas */
const canvas = document.querySelector('.canvas');

let size = gridSlider.getAttribute('value');
let leftColor;

displayGrid(size);
generateRainbow();

gridSlider.oninput = function (e) {
  gridValue.forEach(val => {
    val.textContent = e.target.value;
  });
  size = e.target.value;
  eraseGrid();
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

function eraseGrid() {
  let display = canvas.querySelectorAll('.grid-cell');
  display.forEach(box => {
    box.remove();
  });
}

function generateRainbow() {
  let colors = [];
  for (let i = 0; i < 360; i++) {
    colors[i] = `hsl(${i}, 100%, 50%)`;
    /* if(i > 359) {
      colors[i] = `hsl(0, 100%, 50%)`;
    } */
  }
  colors = colors.toString();
  root.style.setProperty("--colors", colors);
}

colorSlider.oninput = function() {
  pickColor();
  console.log(leftColor);
}


function pickColor() {
  const rainbowValue = colorSlider.value;
  let outputColor;
  // if(rainbowValue < 360) {
    outputColor = `hsl(${rainbowValue},100%,50%)`;
  /*}  else {
    outputColor = `hsl(0,100%,50%)`;
  } */
  colorValue.style.backgroundColor = outputColor;
  leftColor = Number(rainbowValue);
  // colorValue.textContent =
}


