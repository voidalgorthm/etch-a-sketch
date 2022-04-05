/* after script load */
document.addEventListener('DOMContentLoaded', function () {
  displayGrid(size);
  generateRainbow();
}, false);

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
const colorPicker = controlColor.querySelector('#cpicker');
const pickerButtons = colorPicker.querySelectorAll('.picker');
const leftPick = colorPicker.querySelector('#cpick1');
const rightPick = colorPicker.querySelector('#cpick2');
const colorSlider = controlColor.querySelector('#cslider');
const select = controlColor.querySelector('#select');
const selectButtons = select.querySelectorAll('.selector');
const leftSelect = select.querySelector('#cselect1');
const rightSelect = select.querySelector('#cselect2');
/* control tools */

/* canvas */
const canvas = document.querySelector('.canvas');

function generateRainbow() {
  let colors = [];
  for (let i = 0; i < 360; i++) {
    colors[i] = `hsl(${i}, 100%, 50%)`;
  }
  colors = colors.toString();
  root.style.setProperty("--colors", colors);
}

let size = gridSlider.getAttribute('value');

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

let leftColor;
let rightColor;

pickerButtons.forEach(picker => {
  picker.addEventListener('change', pickColor, false);
})

function pickColor(e) {
  pickerButtons.forEach(function (picker) {
    if (picker === e.target) {
      if (picker.id.match('cpick1')) {
        leftColor = e.target.value;
      } else if (picker.id.match('cpick2')) {
        rightColor = e.target.value;
      }
    }
  });
}

let sliderActive = select.querySelector('.active');

/* let sliderActive = document.getElementsByClassName('active');
for (let index = 0; index < selectButtons.length; index++) {
  selectButtons[index].addEventListener('click', function () {
    sliderActive[0].classList.remove('active');
    this.classList.add('active');
  });
} */

colorSlider.oninput = () => {
  const rainbowValue = colorSlider.value;
  let outputColor = `hsl(${rainbowValue},100%,50%)`;

  sliderActive.style.backgroundColor = outputColor;

  if (sliderActive.id.match('cselect1')) {
    leftColor = outputColor;
  } else {
    rightColor = outputColor;
  }
}

selectButtons.forEach(button => {
  button.addEventListener('click', switchActive);
})

function switchActive(e) {
  selectButtons.forEach(function (button) {
    if (button === e.target && !button.classList.contains('active')) {
      sliderActive = button;
      return button.classList.add('active');
    }
    return button.classList.remove('active');
  });
}
