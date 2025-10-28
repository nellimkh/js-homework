class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    area() {
        return this.width * this.height;
    }

    perimeter() {
        return 2 * (this.width + this.height);
    }
}

const myRectangle = new Rectangle(3, 6);

console.log("Area:", myRectangle.area());
console.log("Perimeter:", myRectangle.perimeter());
