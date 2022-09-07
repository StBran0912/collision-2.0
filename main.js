// @ts-check
import * as lb2d from './lb2d.js';


/** Interface Box
 * @typedef {Object} Box
 * @property {lb2d.Vector[]} vertices
 * @property {lb2d.Vector} location
 * @property {{velocity:lb2d.Vector, angVelocity:number, mass:number, inertia:number, coefficient:number} } props
 * @property {() => void} display
 * @property {(angle: number) => void} rotate
*/

/** createBox
 * @type {(posx: number, posy: number, w: number, h: number) => Box} 
 */
function createBox(posx, posy, w, h) {
    /** 
    * @type {lb2d.Vector[]} vertices 
    */
    const vertices = new Array(5);
    vertices[0] = lb2d.createVector(posx, posy);
    vertices[1] = lb2d.createVector(posx + w, posy);
    vertices[2] = lb2d.createVector(posx + w, posy + h);
    vertices[3] = lb2d.createVector(posx, posy + h);
    vertices[4] = vertices[0];
    const location = lb2d.createVector(posx + w / 2, posy + h / 2);

    const props = {
        velocity: lb2d.createVector(0, 0),
        angVelocity: 0,
        mass: (w + h)*2,
        inertia: w * h * w,
        coefficient: 0.0005
    }

    /** rotate
     * @type {(angle: number) => void} 
    */
    function rotate(angle) {
        for (let i = 0; i < 4; i++) {
            vertices[i].rotateMatrix(location, angle);
        }
    }

    /** display
     * @type {() => void} 
    */
    function display() {
        lb2d.strokeWidth(2);
        lb2d.shape(vertices[0].pos.x, vertices[0].pos.y, vertices[1].pos.x, vertices[1].pos.y, vertices[2].pos.x, vertices[2].pos.y, vertices[3].pos.x, vertices[3].pos.y, 0);
        lb2d.circle(location.pos.x, location.pos.y, 2, 0);
    }

    return {
        vertices:vertices,
        location:location,
        props:props,
        rotate:rotate,
        display:display
    }
}



function start() {
    lb2d.init(800, 500);

    /** @type {Box[]} */
    const box = [];
    box.push(createBox(100, 100, 150, 100));
    box.push(createBox(150, 215, 150, 100));
    box[0].rotate(-0.3);
    box[0].display();
    box[1].rotate(0.4);
    box[1].display();
  
    //lb2d.startAnimation(draw);    
    
}

function draw() {
   //lb2d.background(255, 255, 255);
}

start();
