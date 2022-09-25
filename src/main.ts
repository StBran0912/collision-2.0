import * as lb2d from './lb2d.js';
import * as phys from './physics.js';

let el: (phys.MoverBox | phys.MoverBall)[] = [];
let kicking = phys.createKicking(el);

function start() {    
    el.push(phys.createBox(200, 100, 110, 70));
    el.push(phys.createBox(400, 100, 70, 30));
    el.push(phys.createBox(600, 100, 60, 40));
    el.push(phys.createBall(300, 250, 60));
    el.push(phys.createBall(600, 250, 20));
    
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
