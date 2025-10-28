class Animal{
    constructor(name){
        this.name = name;
    }
    speak(){
        console.log(`${this.name} make a saund`);
        
    }
}

class Dog extends Animal{
    speak(){
        console.log(`${this.name} bark`);
        
    }
}

const myDog = new Dog("ddd:");

myDog.speak();