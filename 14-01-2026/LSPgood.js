class Bird {}

class FlyingBird extends Bird {
  fly() {
    return "Flying";
  }
}

class Penguin extends Bird {
  swim() {
    return "Swimming";
  }
}

function makeFlyingBirdFly(bird) {
  return bird.fly();
}

const sparrow = new FlyingBird();
console.log(makeFlyingBirdFly(sparrow));
