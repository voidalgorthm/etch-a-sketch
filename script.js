/* after script load */
document.addEventListener('DOMContentLoaded', function () {
  displayGrid(size);
  sliderRainbow();
  clickMapping();
  disableCanvasMenu();
}, false);

/* general */
const root = document.documentElement;
const content = document.querySelector('.content');
/* panel */
const panel = content.querySelector('.panel');
const toggleButtons = panel.querySelectorAll('.btns-toggle');
/* control canvas */
const controlCanvas = panel.querySelector('.control#ccanvas');
const gridContainer = controlCanvas.querySelector('#gslider');
const gridSlider = gridContainer.querySelector('#gsize');
const gridValue = gridContainer.querySelectorAll('span.gval');
const backgroundPicker = controlCanvas.querySelector('#bcpicker');
const canvasBackground = backgroundPicker.querySelector('#bcpick');
const clearCanvas = controlCanvas.querySelector('#clear');
/* control color */
const controlColor = panel.querySelector('.control#ccolor');
const colorPicker = controlColor.querySelector('#cpicker');
const pickerButtons = colorPicker.querySelectorAll('.picker');
const leftPick = colorPicker.querySelector('#cpick1');
const rightPick = colorPicker.querySelector('#cpick2');
const colorSlider = controlColor.querySelector('#cslider');
const colorSelect = controlColor.querySelector('#cselect');
const selectButtons = colorSelect.querySelectorAll('.btns-select');
const leftSelect = colorSelect.querySelector('#cselect1');
const rightSelect = colorSelect.querySelector('#cselect2');
/* control tools */

/* canvas */
const frame = content.querySelector('.frame');
const canvas = frame.querySelector('#canvas');

function sliderRainbow() {
  let colors = [];
  for (let i = 0; i < 360; i++) {
    colors[i] = `hsl(${i}, 100%, 50%)`;
  }
  colors = colors.toString();
  colorSlider.style.setProperty("--colors", colors);
}

function disableCanvasMenu() {
  canvas.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  }, false);
}

let size = gridSlider.getAttribute('value');

toggleButtons.forEach(button => {
  button.addEventListener('click', () => {
    button.classList.toggle('on');
  })
});

gridSlider.oninput = function (e) {
  gridValue.forEach(val => {
    val.textContent = e.target.value;
  });
  size = e.target.value;
  eraseGrid();
  displayGrid(size);
  clickMapping();
}

function displayGrid(size) {
  canvas.style.setProperty('--grid-rows', size);
  canvas.style.setProperty('--grid-cols', size);

  for (let index = 0; index < (size * size); index++) {
    let cell = document.createElement('div');
    cell.setAttribute('draggable', false);
    cell.setAttribute('inked', false);
    canvas.appendChild(cell).className = "grid-cell";
  };
};

function eraseGrid() {
  let grid = canvas.querySelectorAll('.grid-cell');
  grid.forEach(box => {
    box.remove();
  });
}

canvasBackground.addEventListener('input', (e) => {
  let grid = canvas.querySelectorAll('.grid-cell');
  grid.forEach(cell => {
    if (cell.getAttribute('inked') === "false") {
      cell.style.backgroundColor = e.target.value;
    }
  });
}, false);

canvasBackground.addEventListener('change', (e) => {
  let grid = canvas.querySelectorAll('.grid-cell');
  grid.forEach(cell => {
    if (cell.getAttribute('inked') === "false") {
      cell.style.backgroundColor = e.target.value;
    }
  });
}, false);

clearCanvas.addEventListener('click', () => {
  let grid = canvas.querySelectorAll('.grid-cell');
  grid.forEach(cell => {
    cell.setAttribute('inked', false);
    cell.style.backgroundColor = canvasBackground.value;
  });
});

let leftColor = leftPick.value;
let rightColor = rightPick.value;

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

let sliderActive = colorSelect.querySelector('.active');
let sliderInactive = colorSelect.querySelector(':not(.active)');

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
  selectButtons.forEach(button => {
    if (button === e.target) {
      if (button.classList.contains('active')) {
        sliderInactive = button;
        button.classList.remove('active');
      } else {
        sliderActive = button;
        button.classList.add('active');
      }
    } else if (button !== e.target) {
      if (button.classList.contains('active')) {
        sliderInactive = button;
        button.classList.remove('active');
      } else {
        sliderActive = button;
        button.classList.add('active');
      }
    }
  });
}

let determineMouse = function (e) {
  if (e.buttons === 1) {
    return 1;
  } else if (e.buttons === 2) {
    return 2;
  } else if (e.buttons === 0) {
    return 0;
  }
};

let inkcolor = true;
let inkrainbow = false;
let inkeraser = false;

let mouseEvent = false;

function stopDragging() {
  mouseEvent = false;
  canvas.removeEventListener('mouseup', stopDragging);
}

function stopMouseLeave() {
  mouseEvent = false;
  canvas.removeEventListener('mouseleave', stopMouseLeave);
}

canvas.addEventListener('mousedown', function (e) {
  mouseEvent = true;
  canvas.addEventListener('mouseup', stopDragging);
  canvas.addEventListener('mouseleave', stopMouseLeave);
  e.preventDefault();
});

function clickMapping() {
  let grid = canvas.querySelectorAll('.grid-cell');
  for (let i = 0; i < grid.length; i++) {
    grid[i].addEventListener('mousedown', clickDraw);
    grid[i].addEventListener('mouseenter', clickDrawHover);
  }
}

function clickDraw(e) {
  e.target.setAttribute('inked', true);
  if (determineMouse(e) === 1) {
    e.target.style.backgroundColor = leftColor;
  } else if (determineMouse(e) === 2) {
    e.target.style.backgroundColor = rightColor;
  }
}

function clickDrawHover(e) {
  if (determineMouse(e) > 0) {
    e.target.setAttribute('inked', true);
    if (determineMouse(e) === 1) {
      e.target.style.backgroundColor = leftColor;
    } else if (determineMouse(e) === 2) {
      e.target.style.backgroundColor = rightColor;
    }
  }
}

/* 
let area = document.getElementById('canvas');
let display = area.getElementsByClassName('grid-cell');
canvas.addEventListener('mousedown', function () {
  canvas.addEventListener('mousemove', drag);
  canvas.addEventListener('mouseup', lift);

  let isDragging = false;

  function drag(e) {
    isDragging = true;
    if (determineMouse(e) === 'left') {
      e.target.style.backgroundColor = leftColor;
    } else if (determineMouse(e) === 'right') {
      e.target.style.backgroundColor = rightColor;
    }
  }

  function lift() {
    isDragging = false;
    canvas.removeEventListener('mousemove', drag);
    canvas.removeEventListener('mouseup', lift);
  }
}); */