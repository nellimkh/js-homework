class Character {
    constructor(name, hp) {
        if (new.target === Character) {
            throw new Error("...");
        }
        this.name = name;
        this.hp = hp;
    }

    attack(target) {
        throw new Error("attack() must be implemented");
    }

    defend(damage) {
        throw new Error("defend() must be implemented");
    }

    isAlive() {
        return this.hp > 0;
    }
}


class Warrior extends Character {
    constructor(name, hp) {
        super(name, hp);
    }

    attack(target) {
        const dmg = Math.floor(Math.random() * 10) + 10; 
        console.log(`${this.name} (Warrior) attacks ${target.name} for ${dmg} damage!`);
        target.defend(dmg);
    }

    defend(damage) {
        const reduced = Math.floor(damage * 0.7); 
        this.hp -= reduced;
        console.log(`${this.name} (Warrior) defends and takes ${reduced} damage. HP = ${this.hp}`);
    }
}


class Mage extends Character {
    constructor(name, hp) {
        super(name, hp);
    }

    attack(target) {
        const dmg = Math.floor(Math.random() * 20) + 5;
        console.log(`${this.name} (Mage) casts a spell on ${target.name} for ${dmg} damage!`);
        target.defend(dmg);
    }

    defend(damage) {
        const reduced = damage - 3;
        const final = reduced > 0 ? reduced : 0;
        this.hp -= final;
        console.log(`${this.name} (Mage) shields and takes ${final} damage. HP = ${this.hp}`);
    }
}


class Archer extends Character {
    constructor(name, hp) {
        super(name, hp);
    }

    attack(target) {
        const dmg = Math.floor(Math.random() * 12) + 8;
        console.log(`${this.name} (Archer) shoots an arrow at ${target.name} for ${dmg} damage!`);
        target.defend(dmg);
    }

    defend(damage) {
        const dodge = Math.random() < 0.25;
        if (dodge) {
            console.log(`${this.name} (Archer) dodged the attack! HP = ${this.hp}`);
            return;
        }
        this.hp -= damage;
        console.log(`${this.name} (Archer) takes ${damage} damage. HP = ${this.hp}`);
    }
}


const w = new Warrior("Thorin", 100);
const m = new Mage("Gandalf", 80);
const a = new Archer("Legolas", 90);

console.log("=== Battle Start ===");

w.attack(m);
m.attack(a);
a.attack(w);

w.attack(a);
a.attack(m);
m.attack(w);

console.log("=== Final HP ===");
console.log(w.name, w.hp);
console.log(m.name, m.hp);
console.log(a.name, a.hp);


