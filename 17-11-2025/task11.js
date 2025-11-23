class Person {
  walk() {
    console.log("Walking");
  }
}

class Student extends Person {
  study() {
    console.log("Studying");
  }
}

const s = new Student();
s.walk();
s.study();

console.log(Object.getPrototypeOf(Student)); 
console.log(Object.getPrototypeOf(Student.prototype));  
console.log(Student.prototype.__proto__);  
