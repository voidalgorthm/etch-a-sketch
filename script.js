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

gslider.oninput = function(e) {
  gval.forEach(val => {
    val.textContent = e.target.value;
  });
}

