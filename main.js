// @ts-check
import * as lb2d from './lb2d.js';

/** Interface Box Properties
 * @typedef {Object} BoxProps
 * @property {lb2d.Vector[]} vertices
 * @property {lb2d.Vector} location
 * @property {lb2d.Vector} velocity
 * @property {number} angVelocity
 * @property {number} mass
 * @property {number} inertia
 * @property {number} coefficient
 */

/** Interface Box
 * @typedef {Object} Box
 * @property {BoxProps} props
 * @property {() => void} display
 * @property {(angle: number) => void} rotate
 * @property {(force: lb2d.Vector, angForce: number) => void} applyForce
*/

/** createBox
 * @type {(posx: number, posy: number, w: number, h: number) => Box} 
 */
function createBox(posx, posy, w, h) {
   /** @type {BoxProps} */
    const props = {
        vertices: new Array(5),
        location: lb2d.createVector(posx + w / 2, posy + h / 2),
        velocity: lb2d.createVector(0, 0),
        angVelocity: 0,
        mass: (w + h)*2,
        inertia: w * h * w,
        coefficient: 0.0005
    }

    props.vertices[0] = lb2d.createVector(posx, posy);
    props.vertices[1] = lb2d.createVector(posx + w, posy);
    props.vertices[2] = lb2d.createVector(posx + w, posy + h);
    props.vertices[3] = lb2d.createVector(posx, posy + h);
    props.vertices[4] = props.vertices[0];

    /** rotate
     * @type {(angle: number) => void} 
    */
    function rotate(angle) {
        for (let i = 0; i < 4; i++) {
            props.vertices[i].rotateMatrix(props.location, angle);
        }
    }

    /** display
     * @type {() => void} 
    */
    function display() {
        lb2d.strokeWidth(2);
        lb2d.shape(props.vertices[0].pos.x, props.vertices[0].pos.y, props.vertices[1].pos.x, props.vertices[1].pos.y, props.vertices[2].pos.x, props.vertices[2].pos.y, props.vertices[3].pos.x, props.vertices[3].pos.y, 0);
        lb2d.circle(props.location.pos.x, props.location.pos.y, 2, 0);
    }
    /** @type {(force: lb2d.Vector, angForce: number) => void} */
    function applyForce(force, angForce) {

    }

    return {
        props:props,
        rotate:rotate,
        display:display,
        applyForce:applyForce
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
