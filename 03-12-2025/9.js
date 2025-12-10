const Flyable = Base => class extends Base {
    fly() {
        console.log(`${this.constructor.name} is flying!`);
    }
};
const Swimmable = Base => class extends Base {
    swim() {
        console.log(`${this.constructor.name} is swimming!`);
    }
};
class Animal {
    constructor(name) {
        this.name = name;
    }
}

class Duck extends Swimmable(Flyable(Animal)) {}
class Penguin extends Swimmable(Animal) {}
class Eagle extends Flyable(Animal) {}

const duck = new Duck("Donald");
const penguin = new Penguin("Pingu");
const eagle = new Eagle("Baldy");

console.log("=== Duck Actions ===");
duck.fly();
duck.swim();

console.log("=== Penguin Actions ===");
penguin.swim();

console.log("=== Eagle Actions ===");
eagle.fly();
