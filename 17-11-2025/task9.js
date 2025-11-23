function myNew(Constructor, ...args) {
    const obj = {};
    Object.setPrototypeOf(obj, Constructor.prototype);
    const result = Constructor.apply(obj, args);
    return (result && typeof result === 'object') ? result : obj;
}

function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.sayHi = function() {
    console.log(`Hi, my name is ${this.name}`);
};

const alice = myNew(Person, "Alice", 25);
console.log(alice.name);
console.log(alice.age);
alice.sayHi();
console.log(Object.getPrototypeOf(alice) === Person.prototype);
