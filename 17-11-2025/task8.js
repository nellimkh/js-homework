function Animal(name) {
    this.name = name;
}

Animal.prototype.eat = function() {};

function Dog(name, breed) {
    Animal.call(this, name);
    this.breed = breed;
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
Dog.prototype.bark = function() {};

console.log(Dog.prototype.constructor === Dog);    
console.log(Animal.prototype.constructor === Animal);  
console.log(Dog.__proto__ === Animal);  
console.log(Object.getPrototypeOf(Dog)); 
