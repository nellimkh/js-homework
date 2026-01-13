// bad example
class ShippingCostCalculator {
  calculate(order, type) {
    if (type === "ground") {
      return order.weight * 1;
    } else if (type === "air") {
      return order.weight * 2;
    } else if (type === "express") {
      return order.weight * 3;
    }
  }
}

const order = { weight: 10 };
const calculator = new ShippingCostCalculator();

console.log(calculator.calculate(order, "air"));
