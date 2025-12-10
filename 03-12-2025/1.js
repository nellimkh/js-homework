class Shape{
  constructor(color){
    if(new.target === Shape){
        throw new Error("...");
    }
    this.color = color;
}
  area(){
    throw new Error("area() must be implemented");
}

  perimeter(){
    throw new Error("perimeter() must be implemented");
}

  describe(){
    console.log("Shape:", this.constructor.name);
    console.log("Color:", this.color);
    console.log("Area:", this.area());
    console.log("Perimeter:", this.perimeter());
    console.log("...");
    
  }
}



class Circle extends Shape{
    constructor(color, radius){
        super(color);
        this.radius = radius;
    }
    
    area(){
        return Math.PI * this.radius ** 2;
    }

    perimeter(){
        return 2 * Math.PI * this.radius;
    }
}


class Rectangle extends Shape{
    constructor(color, whidth, heigth){
        super(color);
        this.whidth = whidth;
        this.heigth = heigth;
    }


    area() {
        return this.width * this.height;
    }

    perimeter() {
        return 2 * (this.width + this.height);
    }

}


class Triangle extends Shape {
    constructor(color, a, b, c) {
        super(color);
        this.a = a;
        this.b = b;
        this.c = c;
    }

    area() {
        const s = (this.a + this.b + this.c) / 2;
        return Math.sqrt(s * (s - this.a) * (s - this.b) * (s - this.c));
    }

    perimeter() {
        return this.a + this.b + this.c;
    }
}


const shapes = [
    new Circle("red", 5),
    new Rectangle("blue", 4, 6),
    new Triangle("green", 3, 4, 5)
];

shapes.forEach(shape => shape.describe());
