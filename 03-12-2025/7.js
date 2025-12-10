class Transport {
    constructor(name) {
        if (new.target === Transport) {
            throw new Error(" ");
        }
        this.name = name;
    }

    move() {
        throw new Error("move() must be implemented");
    }

    maxSpeed() {
        throw new Error("maxSpeed() must be implemented");
    }

    info() {
        console.log(`Transport type: ${this.constructor.name}, Max Speed: ${this.maxSpeed()} km/h`);
    }
}

const FuelMixin = Base => class extends Base {
    constructor(...args) {
        super(...args);
        this.fuel = 0;
    }

    refuel(amount) {
        if (amount <= 0) {
            console.log("Refuel amount must be positive");
            return;
        }
        this.fuel += amount;
        console.log(`${this.name} refueled: +${amount} units, total fuel = ${this.fuel}`);
    }

    consume(amount) {
        if (amount > this.fuel) {
            console.log(`${this.name} does not have enough fuel!`);
            return false;
        }
        this.fuel -= amount;
        return true;
    }
};


class Car extends FuelMixin(Transport) {
    constructor(name) {
        super(name);
    }

    maxSpeed() {
        return 180;
    }

    move() {
        if (this.consume(10)) {
            console.log(`${this.name} the car is moving at ${this.maxSpeed()} km/h`);
        }
    }
}

class Plane extends FuelMixin(Transport) {
    constructor(name) {
        super(name);
    }

    maxSpeed() {
        return 900;
    }

    move() {
        if (this.consume(50)) {
            console.log(`${this.name} the plane is flying at ${this.maxSpeed()} km/h`);
        }
    }
}

class Ship extends FuelMixin(Transport) {
    constructor(name) {
        super(name);
    }

    maxSpeed() {
        return 80;
    }

    move() {
        if (this.consume(30)) {
            console.log(`${this.name} the ship is sailing at ${this.maxSpeed()} km/h`);
        }
    }
}

const car = new Car("Ferrari");
const plane = new Plane("Boeing");
const ship = new Ship("Titanic");

car.info();
plane.info();
ship.info();

car.refuel(50);
plane.refuel(200);
ship.refuel(100);

car.move();
plane.move();
ship.move();
car.consume(100);
