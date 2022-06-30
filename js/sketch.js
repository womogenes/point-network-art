// Set up the title
const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
const { title } = params;
document.querySelector('#title').innerText = title;

import './utils.js';
import { draw } from './draw.js';
import { particles } from './vars.js';
import { Particle } from './Particle.js';

// Globals
window.Vector = p5.Vector;

window.setup = () => {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent(document.querySelector('#sketch-container'));
  pixelDensity(1);
  ellipseMode('center');
  ellipseMode('radius');

  let n = (width * height) / 10000;
  for (let i = 0; i < n; i++) {
    let pos = new Vector(random(0, width), random(0, height));
    let vel = Vector.random2D().mult(random(0.1, 0.5));
    particles.push(new Particle(pos, vel));
  }
};

window.windowResized = () => {
  resizeCanvas(windowWidth, windowHeight);
};

window.draw = draw;
