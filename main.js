import * as lb2d from './lb2d.js';


/** Interface Box
 * @typedef {Object} Box
 *
*/

/** cerates a Box
 * @type {(posx: number, posy: number, w: number, h: number) => Box}
 */
function createBox(posx, posy, w, h) {
    /** @type {lb2d.Vector[]} vertices vertices of the Box */
    let vertices = new Array(5);
    vertices[0] = lb2d.createVector(posx, posy);
    vertices[1] = lb2d.createVector(posx + w, posy);
    vertices[2] = lb2d.createVector(posx + w, posy + h);
    vertices[3] = lb2d.createVector(posx, posy + h);
    vertices[4] = this.vertices[0];
    let location = lb2d.createVector(posx + w / 2, posy + h / 2);
    let velocity = lb2d.createVector(0, 0);
    let angVelocity = 0;
    let mass = (w + h)*2;
    let inertia = w * h * w;
    let coefficient = 0.0005;

    /** Rotates Box by angle
    *  @type {(angle: number) => void} */
    function rotate(angle) {
        for (let i = 0; i < 4; i++) {
            vertices[i].rotateMatrix(this.location, angle);
        }
    }
}



function start() {
    lb2d.init(800, 500);
    lb2d.startAnimation(draw);     
}

function draw() {
   lb2d.background(255, 255, 255);
   lb2d.rect(50, 50, 200, 100);
}

start();
