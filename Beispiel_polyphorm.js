// @ts-check
/**
 * @typedef {Object} Cat 
 * @property {()=> void} speak
 */

/**
 * @typedef {Object} Dog 
 * @property {()=> void} speak
 */

/**
 * @type {() => Cat}
 */
function createCat() {
    return {
        speak () {console.log("Ich bin eine Katze...")}
    }
}

/**
 * @type {() => Dog}
 */
 function createDog() {
    return {
        speak () {console.log("Ich bin ein Hund...")}
    }
}

/*
/**
 * @type {Array<Cat|Dog>}
 */

/**
 * @type {(Dog|Cat)[]}
 */
let el = [];
el.push(createCat());
el.push(createDog());
el[0].speak();
el[1].speak();
