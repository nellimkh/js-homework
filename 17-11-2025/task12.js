// Constructor Functions

function Vehicle(type) {
    this.type = type;
}

Vehicle.prototype.start = function() {
    console.log(`${this.type} is starting`);
};

function Car(type, model) {
    Vehicle.call(this, type);
    this.model = model;
}

Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;

Car.prototype.drive = function() {
    console.log(`${this.type} ${this.model} is driving`);
};

const car1 = new Car("Car", "Sedan");
car1.start(); 
car1.drive(); 

// Classes

class VehicleClass {
    constructor(type) {
        this.type = type;
    }
    start() {
        console.log(`${this.type} is starting`);
    }
    static info() {
        console.log("Vehicle class");
    }
}

class CarClass extends VehicleClass {
    constructor(type, model) {
        super(type);
        this.model = model;
    }
    drive() {
        console.log(`${this.type} ${this.model} is driving`);
    }
}

const car2 = new CarClass("Car", "Sedan");
car2.start();  
car2.drive(); 
CarClass.info(); 

// Differences Summary

/*
 */
