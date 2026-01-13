// good example
class ShippingStrategy {
  calculate(order) {
    throw new Error("This method should be overridden");
  }
}

class GroundShipping extends ShippingStrategy {
  calculate(order) {
    return order.weight * 1;
  }
}
class AirShipping extends ShippingStrategy {
  calculate(order) {
    return order.weight * 2;
  }
}

class ExpressShipping extends ShippingStrategy {
  calculate(order) {
    return order.weight * 3;
  }
}

const order = { weight: 10 };

const ground = new GroundShipping();
const air = new AirShipping();
const express = new ExpressShipping();

console.log(ground.calculate(order));
console.log(air.calculate(order));
console.log(express.calculate(order)); 

class DroneShipping extends ShippingStrategy {
  calculate(order) {
    return order.weight * 5;
  }
}

const drone = new DroneShipping();
console.log(drone.calculate(order));
