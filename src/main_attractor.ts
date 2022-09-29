import * as lb2d from './lb2d.js';
import * as phys from './physics.js';

interface Attractor extends phys.MoverBall {
    attract(m: phys.MoverBall): lb2d.Vector,
}


function createAttractor (x: number, y: number, r: number): Attractor {
    let G = 0.4;
    let ball = phys.createBall(x, y, r);
    let attractor = {
        attract(mover: phys.MoverBall): lb2d.Vector {
            let force = lb2d.subVector(ball.me.location, mover.me.location);
            let distance = force.mag();
            distance = lb2d.constrain(distance,5, 25);
            force.normalize();
            let strength = (G * ball.me.mass * mover.me.mass) / (distance * distance);
            force.mult(strength);
            return force;    
        }
    }

    return {
        ...ball,
        ...attractor
    }

}

let a  = createAttractor(10,10,2);

function start() {   
    //lb2d.init(800, 500);
    //lb2d.startAnimation(draw);    
    console.log(a);
}

function draw() {
    //lb2d.background(50, 50, 50);
    }


start();
