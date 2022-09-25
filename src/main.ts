import * as lb2d from './lb2d.js';
import * as phys from './physics.js';

let el: (phys.MoverBox | phys.MoverBall)[] = [];
let kicking = phys.createKicking(el);

function start() {   
    for (let i = 0; i < 4; i++) {
        el.push(phys.createBall(lb2d.random(0, 700), lb2d.random(0, 400), lb2d.random(10, 40)));
    }    

    for (let i = 0; i < 4; i++) {
        el.push(phys.createBox(lb2d.random(0, 700), lb2d.random(0, 400), lb2d.random(40, 100), lb2d.random(40, 100)));
    }

    el.push(phys.createBox(0, 0, 800, 1));
    el[8].me.mass = Infinity; el[8].me.inertia = Infinity;
    el.push(phys.createBox(0, 0, 1, 499));
    el[9].me.mass = Infinity; el[9].me.inertia = Infinity;
    el.push(phys.createBox(0, 499, 800, 1));
    el[10].me.mass = Infinity; el[10].me.inertia = Infinity;
    el.push(phys.createBox(799, 0, 1, 499));
    el[11].me.mass = Infinity; el[11].me.inertia = Infinity;
   
    lb2d.init(800, 500);
    lb2d.startAnimation(draw);    
}

function draw() {
    lb2d.background(50, 50, 50);
    kicking.check();
    for (let i = 0; i < el.length; i++) {
        for (let j = i+1; j < el.length; j++ ) {
            phys.checkCollision(el[i], el[j]);
        }
        el[i].applyFriction()
        el[i].update();
        el[i].display();  
    }
}

start();
