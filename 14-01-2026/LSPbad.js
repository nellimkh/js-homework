class Bird {
  fly() {
    return "Flying";
  }
}

class Penguin extends Bird {
  fly() {
    throw new Error("Penguins can't fly");
  }
}
function makeBirdFly(bird) {
  return bird.fly();
}

const bird = new Bird();
const penguin = new Penguin();

console.log(makeBirdFly(bird));
console.log(makeBirdFly(penguin));
