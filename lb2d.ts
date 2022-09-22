// Bibliothek lb2d
// von Stefan Brandner, inspiriert (und abgekupfert) von P5
// Vector mit factory function

// Instanzvariablen des Moduls
const canv = <HTMLCanvasElement>document.querySelector("canvas");
const output = <HTMLParagraphElement>document.querySelector("#output");
const ctx = <CanvasRenderingContext2D>canv.getContext("2d");
export let mouseX = 0;
export let mouseY = 0;
let mouseStatus = 0;
let loop = true;

/** Init Canvas and EventListener 
 * 
*/
export function init(w: number, h: number) {
  canv.width = w;
  canv.height = h;
  ctx.strokeStyle = "RGB(0, 206, 209)";  
  ctx.fillStyle = "RGB(0, 206, 209)";
  ctx.lineWidth = 1;
  ctx.save();
  canv.addEventListener("mousemove", updMousePos);
  canv.addEventListener("mousedown", setMouseDown);
  canv.addEventListener("mouseup", setMouseUp);
  canv.addEventListener("touchmove", updTouchPos);
  canv.addEventListener("touchstart", setTouchDown);
  canv.addEventListener("touchend", setTouchUp);
}

/** Starts Animation Loop with Callback fnDraw 
 * 
*/
export function startAnimation(fnDraw:()=>void) {
  let draw = fnDraw;
  loop = true;
  let animate = () => {
    draw();
    if (loop) {
      window.requestAnimationFrame(animate);
    }
  };
  window.requestAnimationFrame(animate);
}

/** get width of canvas 
 * 
*/
export function getWidth(): number {
  return canv.width;
}

/** get height of canvas 
 * 
*/
export function getHeight(): number {
  return canv.height;
}

/** stop looping 
 * 
*/
export function noLoop() {
  loop = false;
}

/** update mouse position 
 * 
*/
function updMousePos(e: MouseEvent) {
  mouseX = e.offsetX;
  mouseY = e.offsetY;
}

/** update status down position 
 * 
*/
function setMouseDown() {
  mouseStatus = 1;
}

/** update status up position 
 * 
*/
function setMouseUp() {
  mouseStatus = 2;
}

/** update touch position 
 * 
*/
function updTouchPos(e: TouchEvent) {
  e.preventDefault();
  //@ts-ignore
  mouseX = e.targetTouches[0].pageX - e.target.getBoundingClientRect().left;
  //@ts-ignore
  mouseY = e.targetTouches[0].pageY - e.target.getBoundingClientRect().top;
}

/** update status down position 
 * 
*/
function setTouchDown(e: TouchEvent) {
  mouseStatus = 1;
  updTouchPos(e);
}

/** update status up position 
 * 
*/
export function setTouchUp() {
  mouseStatus = 2;
}

/** returns true when mpuse is down position 
 * 
*/
export function isMouseDown(): boolean {
  if (mouseStatus == 1) {
    return true;
  } else {
    return false;
  }
}

/** returns true when mouse is Up-Position 
 * 
*/
export function isMouseUp(): boolean {
  if (mouseStatus == 2) {
    mouseStatus = 0;
    return true;
  } else {
    return false;
  }
}

/** creates Paragraph-Element on html 
 * 
*/
export function createP(item: string) {
  const newItem = document.createElement("p");
  newItem.textContent = item;
  output.appendChild(newItem);
}

/** saves the current drawing state. Use together with pop 
 * 
*/
export function push() {
  ctx.save();
}

/** restores drawing state. Use together with push 
 * 
*/
export function pop() {
  ctx.restore();
}

/** Transformation to current matrix 
 * 
*/
export function translate(x: number, y: number) {
  ctx.translate(x, y);
}
/** rotates drawing context in degrees */
export function rotate(n: number) {
  ctx.rotate(n);
}

/** Fillcolor of shape 
 * @color r (0..255), g (0...255), b (0...255) 
*/
export function fillColor(...color: number[]) {
  let r: number;
  let g: number;
  let b: number;
  if (color.length == 1) {
    r = color[0];
    g = color[0];
    b = color[0];
  } else {
    r = color[0] || 0;
    g = color[1] || 0;
    b = color[2] || 0;
  }

  ctx.fillStyle = `RGB(${r},${g},${b})`;
}

/** Stroke Gradiant 
 * @color 0...255 
*/
export function strokeGrd(color: number, x: number, y: number, max: number) {
  const grd = ctx.createRadialGradient(x, y, 5, x, y, max);
  grd.addColorStop(0, `RGB(${color},${color},${color})`);
  grd.addColorStop(1, `RGB(${0},${0},${0})`);
  ctx.strokeStyle = grd;
}

/** Strokecolor of shape
 * @color r (0..255), g (0...255), b (0...255)  
*/
export function strokeColor(...color: number[]) {
  let r: number;
  let g: number;
  let b: number;
  if (color.length == 1) {
    r = color[0];
    g = color[0];
    b = color[0];
  } else {
    r = color[0] || 0;
    g = color[1] || 0;
    b = color[2] || 0;
  }

  ctx.strokeStyle = `RGB(${r},${g},${b})`;
}

/** strokewidth of line
 * @w width  
*/
export function strokeWidth(w: number) {
  ctx.lineWidth = w;
}

/** background color of drawing context
 * @color r (0..255), g (0...255), b (0...255)  */
export function background(...color: number[]) {
  let r: number;
  let g: number;
  let b: number;
  if (color.length == 1) {
    r = color[0];
    g = color[0];
    b = color[0];
  } else {
    r = color[0] || 0;
    g = color[1] || 0;
    b = color[2] || 0;
  }

  push();
  ctx.fillStyle = `RGB(${r},${g},${b})`;
  ctx.fillRect(0, 0, canv.width, canv.height);
  pop();
}

/** drawing rectangle with start position
 * @x position-x 
 * @y position-y
 * @w width
 * @h height
 * @style 0, 1 or 2 
 */
export function rect(x: number, y: number, w: number, h: number, style = 0) {
  if (style == 0) {
    ctx.strokeRect(x, y, w, h);
  }
  if (style == 1) {
    ctx.fillRect(x, y, w, h);
  }
  if (style == 2) {
    ctx.strokeRect(x, y, w, h);
    ctx.fillRect(x, y, w, h);
  }
}

/** drawing line
 * @x1 point 1
 * @y1 point 1
 * @x2 point 2
 * @y2 point 2 
 */
export function line(x1: number, y1: number, x2: number, y2: number) {
  const path = new Path2D();
  path.moveTo(x1, y1);
  path.lineTo(x2, y2);
  path.closePath();
  ctx.stroke(path);
}
/** drawing triangle
 * @x1 point 1
 * @y1 point 1
 * @x2 point 2
 * @y2 point 2
 * @x3 point 3
 * @y3 point 3
 * @style 0, 1 or 2 
 */
export function triangle(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, style = 0) {
  const path = new Path2D();
  path.moveTo(x1, y1);
  path.lineTo(x2, y2);
  path.lineTo(x3, y3);
  path.closePath();
  if (style == 0) {
    ctx.stroke(path);
  }
  if (style == 1) {
    ctx.fill(path);
  }
  if (style == 2) {
    ctx.stroke(path);
    ctx.fill(path);
  }
}

/** drawing shape with 4 points
 * @x1 point 1
 * @y1 point 1
 * @x2 point 2
 * @y2 point 2
 * @x3 point 3
 * @y3 point 3
 * @x4 point 4
 * @y4 point 4
 * @style 0, 1 or 2 
 */
export function shape(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number, style = 0) {
  const path = new Path2D();
  path.moveTo(x1, y1);
  path.lineTo(x2, y2);
  path.lineTo(x3, y3);
  path.lineTo(x4, y4);
  path.closePath();
  if (style == 0) {
    ctx.stroke(path);
  }
  if (style == 1) {
    ctx.fill(path);
  }
  if (style == 2) {
    ctx.stroke(path);
    ctx.fill(path);
  }
}

/**
 * 
 * @x position-x
 * @y position-y
 * @radius radius of Circle 
 * @style 0, 1 or 2 
 */
export function circle(x: number, y: number, radius: number, style = 0) {
  const path = new Path2D();
  path.arc(x, y, radius, 0, 2 * Math.PI);
  path.closePath();
  if (style == 0) {
    ctx.stroke(path);
  }
  if (style == 1) {
    ctx.fill(path);
  }
  if (style == 2) {
    ctx.stroke(path);
    ctx.fill(path);
  }
}

/** Draw an arrow 
 * @v_base Base of arrow
 * @v_target Target of arrow
 * @myColor Color of arrow 
 */
 export function drawArrow(v_base: Vector, v_target: Vector, myColor: number) {
  const v_heading = subVector(v_target, v_base);
  push();
  strokeColor(myColor);
  strokeWidth(3);
  fillColor(myColor);
  translate(v_base.pos.x, v_base.pos.y);
  line(0, 0, v_heading.pos.x, v_heading.pos.y);
  rotate(v_heading.heading());
  let arrowSize = 7;
  translate(v_heading.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}

interface Perlin {
  noise: (x: number, y?: number, z?: number) => number;
  noiseDetail: (lod: number, falloff: number) => void;
  noiseSeed: (seed: number) => void;
}

/** returns perlin object 
 * 
*/
export function perlinNoise(): Perlin {
  const PERLIN_YWRAPB = 4;
  const PERLIN_YWRAP = 1 << PERLIN_YWRAPB;
  const PERLIN_ZWRAPB = 8;
  const PERLIN_ZWRAP = 1 << PERLIN_ZWRAPB;
  const PERLIN_SIZE = 4095;

  let perlin_octaves = 4; // default to medium smooth
  let perlin_amp_falloff = 0.5; // 50% reduction/octave

  const scaled_cosine = (i) => 0.5 * (1.0 - Math.cos(i * Math.PI));

  let perlin; // will be initialized lazily by noise() or noiseSeed()

  const noise = function (x: number, y = 0, z = 0): number {
    if (perlin == null) {
      perlin = new Array(PERLIN_SIZE + 1);
      for (let i = 0; i < PERLIN_SIZE + 1; i++) {
        perlin[i] = Math.random();
      }
    }

    if (x < 0) {
      x = -x;
    }
    if (y < 0) {
      y = -y;
    }
    if (z < 0) {
      z = -z;
    }

    let xi = Math.floor(x),
      yi = Math.floor(y),
      zi = Math.floor(z);
    let xf = x - xi;
    let yf = y - yi;
    let zf = z - zi;
    let rxf, ryf;

    let r = 0;
    let ampl = 0.5;

    let n1, n2, n3;

    for (let o = 0; o < perlin_octaves; o++) {
      let of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB);

      rxf = scaled_cosine(xf);
      ryf = scaled_cosine(yf);

      n1 = perlin[of & PERLIN_SIZE];
      n1 += rxf * (perlin[(of + 1) & PERLIN_SIZE] - n1);
      n2 = perlin[(of + PERLIN_YWRAP) & PERLIN_SIZE];
      n2 += rxf * (perlin[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n2);
      n1 += ryf * (n2 - n1);

      of += PERLIN_ZWRAP;
      n2 = perlin[of & PERLIN_SIZE];
      n2 += rxf * (perlin[(of + 1) & PERLIN_SIZE] - n2);
      n3 = perlin[(of + PERLIN_YWRAP) & PERLIN_SIZE];
      n3 += rxf * (perlin[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n3);
      n2 += ryf * (n3 - n2);

      n1 += scaled_cosine(zf) * (n2 - n1);

      r += n1 * ampl;
      ampl *= perlin_amp_falloff;
      xi <<= 1;
      xf *= 2;
      yi <<= 1;
      yf *= 2;
      zi <<= 1;
      zf *= 2;

      if (xf >= 1.0) {
        xi++;
        xf--;
      }
      if (yf >= 1.0) {
        yi++;
        yf--;
      }
      if (zf >= 1.0) {
        zi++;
        zf--;
      }
    }
    return r;
  };

  /** @method noiseDetail
   * @param {Number} lod number of octaves to be used by the noise
   * @param {Number} falloff falloff factor for each octave */
  const noiseDetail = function (lod, falloff) {
    if (lod > 0) {
      perlin_octaves = lod;
    }
    if (falloff > 0) {
      perlin_amp_falloff = falloff;
    }
  };

  /** @method noiseSeed
   * @param {Number} seed   the seed value */
  const noiseSeed = function (seed) {
    // Linear Congruential Generator
    // Variant of a Lehman Generator
    const lcg = (() => {
      // Set to values from http://en.wikipedia.org/wiki/Numerical_Recipes
      // m is basically chosen to be large (as it is the max period)
      // and for its relationships to a and c
      const m = 4294967296;
      // a - 1 should be divisible by m's prime factors
      const a = 1664525;
      // c and m should be co-prime
      const c = 1013904223;
      let seed, z;
      return {
        setSeed(val) {
          // pick a random seed if val is undefined or null
          // the >>> 0 casts the seed to an unsigned 32-bit integer
          z = seed = (val == null ? Math.random() * m : val) >>> 0;
        },
        getSeed() {
          return seed;
        },
        rand() {
          // define the recurrence relationship
          z = (a * z + c) % m;
          // return a float in [0, 1)
          // if z = m then z / m = 0 therefore (z % m) / m < 1 always
          return z / m;
        }
      };
    })();

    lcg.setSeed(seed);
    perlin = new Array(PERLIN_SIZE + 1);
    for (let i = 0; i < PERLIN_SIZE + 1; i++) {
      perlin[i] = lcg.rand();
    }
  };

  return {
    noise: noise,
    noiseDetail: noiseDetail,
    noiseSeed: noiseSeed
  };
}

/** randomgenerator between n1 and n2 
 * 
*/
export function random(n1:number, n2:number): number {
  return Math.floor(Math.random() * (n2 - n1) + n1);
}

/** limits value between min and max 
 * 
*/
export function constrain(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** scales value n to a new range 
 * 
*/
export function map(n:number, start1: number, stop1: number, start2: number, stop2: number): number {
  const newval = ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
  if (start2 < stop2) {
    return constrain(newval, start2, stop2);
  } else {
    return constrain(newval, stop2, start2);
  }
}

/** Limits number  
 * 
*/
export function limitNum(number: number, limit: number): number {
  const vorzeichen = number < 0 ? -1 : 1;
  let numberMag = Math.abs(number);
  if (numberMag > limit) {
    numberMag = limit;
  }
  return numberMag * vorzeichen;
}

///////////////////////////////////////////////
//     Ab hier Implementierung für Vector !!!
///////////////////////////////////////////////
export interface Vector {
  pos: {x: number, y:number};
  set: (x: number, y: number) => void;
  copy: () => Vector;
  div: (n: number) => void;
  mult: (n: number) => void;
  mag: () => number;
  add: (v: Vector) => void;
  sub: (v: Vector) => void;
  dist: (v: Vector) => number;
  normalize: () => void;
  limit: (max: number) => void;
  setMag: (magnitude: number) => void;
  dot: (v: Vector) => number;
  cross: (v: Vector) => number;
  heading: () => number;
  rotate: (base: Vector, n: number) => void;
  rotateMatrix: (base: Vector, n: number) => void;
  angleBetween: (v: Vector) => number;
  perp: () => Vector;
}

export function createVector (x: number, y: number): Vector {
  
  const pos = {x, y}

  function set(x: number, y: number) {
    pos.x = x;
    pos.y = y;
  }
  
  function copy(): Vector {
    return createVector(pos.x, pos.y);
  }

  function div(n:  number) {
    pos.x /= n;
    pos.y /= n;
  }

  function mult(n: number) {
    pos.x *= n;
    pos.y *= n;
  }

  function magSq(): number {
    return pos.x * pos.x + pos.y * pos.y;
  }

  function mag(): number {
    return Math.sqrt(magSq());
  }

  function add(v: Vector) {
    pos.x += v.pos.x;
    pos.y += v.pos.y;
  }

  function sub(v: Vector) {
    pos.x -= v.pos.x;
    pos.y -= v.pos.y;
  }

  function dist(v: Vector): number {
    const vdist = copy();
    vdist.sub(v);
    return vdist.mag();
  }

  function normalize() {
    const len = mag();
    if (len != 0) {
      div(len);
    }
  }

  function limit(max: number) {
    const mSq = magSq();
    if (mSq > max * max) {
      setMag(max);
    }
  }
  
  function setMag(magnitude: number) {
    normalize();
    mult(magnitude);
  }
  
  function dot(v: Vector): number {
    return pos.x * v.pos.x + pos.y * v.pos.y;
  }
  
  function cross(v: Vector): number {
    return pos.x * v.pos.y - pos.y * v.pos.x;
  }

  function heading(): number {
    const h = Math.atan2(pos.y, pos.x);
    return h;
  }
  
  function rotate(base: Vector, n: number) {
    const direction = copy();
    direction.sub(base);
    const newHeading = direction.heading() + n;
    const magnitude = direction.mag();
    pos.x = base.pos.x + Math.cos(newHeading) * magnitude;
    pos.y = base.pos.y + Math.sin(newHeading) * magnitude;
  }
  
  function rotateMatrix(base: Vector, n: number) {
    const direction = copy();
    direction.sub(base);
    const x = direction.pos.x * Math.cos(n) - direction.pos.y * Math.sin(n);
    const y = direction.pos.x * Math.sin(n) + direction.pos.y * Math.cos(n);
    pos.x = x + base.pos.x;
    pos.y = y + base.pos.y;
  }

  function angleBetween(v: Vector): number {
    const dotmagmag = dot(v) / (mag() * v.mag());
    const angle = Math.acos(Math.min(1, Math.max(-1, dotmagmag)));
    return angle;
  }

  function perp(): Vector {
    return createVector(-pos.y, pos.x);
  }
  
  // public
  return {
    // internal properties to become public
    pos: pos,
    set: set,
    copy: copy,
    div: div,
    mult: mult,
    mag: mag,
    add: add,
    sub: sub,
    dist: dist,
    normalize: normalize,
    limit: limit,
    setMag: setMag,
    dot: dot,
    cross: cross,
    heading: heading,
    rotate: rotate,
    rotateMatrix: rotateMatrix,
    angleBetween: angleBetween,
    perp: perp
  }
}

/** creates an Random Vector 
 * 
*/
 export function VectorRandom2D(): Vector {
  const angle = Math.random() * Math.PI * 2;
  const x = Math.cos(angle);
  const y = Math.sin(angle);
  return createVector(x, y);
}

/** creates Vector with angle 
 * 
*/
 export function fromAngle(angle: number, len: number): Vector {
  const x = len * Math.cos(angle);
  const y = len * Math.sin(angle);
  return createVector(x, y);
}

/** adds v2 to v1 an creates new Vector 
 * 
*/
 export function addVector(v1: Vector, v2: Vector): Vector {
  return createVector(v1.pos.x + v2.pos.x, v1.pos.y + v2.pos.y);
}

/** substract v2 from v1 and create new Vector 
 * 
*/
 export function subVector(v1: Vector, v2: Vector): Vector {
  return createVector(v1.pos.x - v2.pos.x, v1.pos.y - v2.pos.y);
}

/** multiply vector with scalar 
 * 
*/
 export function multVector(v: Vector, n: number): Vector {
  const vmult = v.copy();
  vmult.mult(n);
  return vmult;
}

/** divide vector by scalar n 
 * 
*/
 export function divVector(v: Vector, n: number): Vector {
  const vdiv = v.copy();
  vdiv.div(n);
  return vdiv;
}

/** dot product of v1 and v2 
 * 
*/
 export function dotProduct(v1: Vector, v2: Vector): number {
  return v1.dot(v2);
}

/** cross product of v1 and v2 
 * 
*/
export function crossProduct(v1: Vector, v2: Vector): number {
  return v1.cross(v2);
}

/** Returns Point of intersection + Scalar s between 
 * line a (a0->a1) and line b (b0->b1)
 * Example: const [Point, s] = intersect(a0, a1, b0, b1) 
*/
 export function intersect(a0: Vector, a1: Vector, b0: Vector, b1: Vector) {
  let pt: [Vector|null, number|null] = [null, null]; // pt[0] = Point of intersection, pt[1] = scalar s
  const a = subVector(a1, a0);
  const b = subVector(b1, b0);
  const den1 = a.cross(b);
  const den2 = b.cross(a);

  if (den1 != 0) {
    const s = subVector(b0, a0).cross(b) / den1;
    const u = subVector(a0, b0).cross(a) / den2;
    if (s > 0 && s < 1 && u > 0 && u < 1) {
      const p = addVector(a0, multVector(a, s));
      pt[0] = p;
      pt[1] = s;
    }
  }

  return pt;
}

/** Mindistance between point p and line a(a0->a1) 
 * 
*/
export function minDist(p: Vector, a0: Vector, a1: Vector): number|null {
  let dist: number|null = null;

  //Vektor line a0 to a1
  const a0a1 = subVector(a1, a0);
  //Vektor imaginary line a0 to p
  const a0p = subVector(p, a0);
  //Magnitude of line a0 to a1
  const magnitude = a0a1.mag();

  //Scalarprojecton from line a0p to line a0a1
  a0a1.normalize();
  const sp = a0a1.dot(a0p);

  //Scalarprojection in magnitude of line a0a1?
  if (sp > 0 && sp <= magnitude) {
    a0a1.mult(sp);
    dist = subVector(a0p, a0a1).mag();
  }
  return dist;
}