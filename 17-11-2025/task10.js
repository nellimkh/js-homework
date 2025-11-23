class Car {
  drive() {}
}

console.log(Car.prototype);
console.log(Object.getOwnPropertyNames(Car.prototype));

const car = new Car();
for (let key in car) {
  console.log(key);
}
