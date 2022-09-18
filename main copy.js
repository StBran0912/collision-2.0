// @ts-check
import * as lb2d from './lb2d.js';
import * as phys from './physics.js';

/** @type {phys.Box[]} */
let boxes = [];
/** @type {phys.Ball[]} */
let balls = [];

function start() {    
    boxes.push(phys.createBox(100, 120, 150, 100));
    boxes.push(phys.createBox(400, 210, 150, 100));
    boxes[0].rotate(-0.3);
    boxes[1].rotate(0.4);
    boxes[0].me.velocity = lb2d.createVector(2, 0);
    
    balls.push(phys.createBall(350, 250, 35));
    balls[0].me.velocity = lb2d.createVector(1, 0);
    balls[0].me.angAccel = 0.008;
    
    lb2d.init(800, 500);
    lb2d.startAnimation(draw);    
}

function draw() {
    lb2d.background(50, 50, 50);
    for (let i = 0; i < boxes.length; i++) {
        for (let j = i+1; j < boxes.length; j++) {
            //phys.checkCollisionBoxes(boxes[i], boxes[j]);
        }
        // eventuell applyForce(wind)
        // applyFriction()
        boxes[i].update();
        boxes[i].display();  
        balls[0].update();  
        balls[0].display();
    }
}

start();
