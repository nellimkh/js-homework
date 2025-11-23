const a = { x: 1 };
const b = { y: 2 };
const c = { z: 3 };
Object.setPrototypeOf(b, a);
Object.setPrototypeOf(c, b);

console.log(c.x); 
console.log(c.y); 
console.log(c.z); 

console.log(Object.getPrototypeOf(b) === a); 
console.log(Object.getPrototypeOf(c) === b); 
