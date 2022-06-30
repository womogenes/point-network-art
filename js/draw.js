import { particles } from './vars.js';

const sigmoid = (x) => {
  return 1 / (1 + Math.exp(-x));
};

export const draw = () => {
  background(10);

  for (let p of particles) {
    p.update();
  }

  let tree = new Quadtree(
    {
      x: 0,
      y: 0,
      width: width,
      height: height,
    },
    4
  );

  let detectRadius = 100;

  for (let p of particles) {
    tree.insert({
      x: p.pos.x - detectRadius,
      y: p.pos.y - detectRadius,
      width: detectRadius * 2,
      height: detectRadius * 2,
      body: p,
    });
  }

  for (let p of particles) {
    let candidates = tree.retrieve({
      x: p.pos.x - p.rad,
      y: p.pos.y - p.rad,
      width: p.rad * 2,
      height: p.rad * 2,
    });

    for (let c of candidates) {
      if (p === c) continue;

      let d = dist(p.pos.x, p.pos.y, c.body.pos.x, c.body.pos.y);

      if (d > detectRadius + 5) continue;

      let alpha = (detectRadius / d) * 50;
      stroke(255, alpha);
      strokeWeight(min(3, detectRadius / d));
      line(p.pos.x, p.pos.y, c.body.pos.x, c.body.pos.y);
    }
  }

  for (let p of particles) {
    p.display();
  }
};
