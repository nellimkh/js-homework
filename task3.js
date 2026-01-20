const assert = (condition, message, ErrorType = ValidationError) => {
    if (!condition) {
        throw new ErrorType(message);
    }
};

const RE = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    phone: /^\+?[1-9][0-9]{7,14}$/
};

class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
        Error.captureStackTrace(this, this.constructor);
    }
}

class CarNotAvailableError extends Error {
    constructor(message = "Car is not available") {
        super(message);
        this.name = "CarNotAvailableError";
        Error.captureStackTrace(this, this.constructor);
    }
}

class InvalidRentalDurationError extends Error {
    constructor(message = "Invalid rental duration") {
        super(message);
        this.name = "InvalidRentalDurationError";
        Error.captureStackTrace(this, this.constructor);
    }
}

const Validators = {
    isNonEmptyStrig(value, message) {
        assert(typeof value === "string" && value.trim(), message);
    },

    isPositiveNumber(value, message) {
        assert(Number.isFinite(value) && value > 0, message);
    },

    isValidEmail(value, message) {
        assert(RE.email.test(value), message);
    },

    isValidPhoneNumber(value, message) {
        assert(RE.phone.test(value), message);
    },

    isValidInstance(instance, parent, message) {
        assert(instance instanceof parent, message);
    }
};

class Rental {
    static Id = 1;

    constructor(customer, car, rentalDuration) {
        if (new.target === Rental) {
            throw new TypeError("Abstract class cannot have instance");
        }

        Validators.isValidInstance(customer, Customer, "customer must be Customer");
        Validators.isValidInstance(car, Car, "car must be Car");
        Validators.isPositiveNumber(
            rentalDuration,
            "rental duration must be positive number"
        );

        this.rentalId = Rental.Id++;
        this.customer = customer;
        this.car = car;
        this.rentalDuration = rentalDuration;
    }

    rentCar() {
        throw new TypeError("Abstract method");
    }

    returnCar() {
        throw new TypeError("Abstract method");
    }

    calculateRentalPrice() {
        throw new TypeError("Abstract method");
    }
}

class Car {
    #make;
    #model;
    #rentalPricePerDay;
    #available = true;

    constructor(make, model, rentalPricePerDay) {
        Validators.isNonEmptyStrig(make, "invalid car make");
        Validators.isNonEmptyStrig(model, "invalid car model");
        Validators.isPositiveNumber(rentalPricePerDay, "invalid rental price");

        this.#make = make;
        this.#model = model;
        this.#rentalPricePerDay = rentalPricePerDay;
    }

    get make() {
        return this.#make;
    }

    get model() {
        return this.#model;
    }

    get rentalPricePerDay() {
        return this.#rentalPricePerDay;
    }

    get available() {
        return this.#available;
    }

    markRented() {
        if (!this.#available) {
            throw new CarNotAvailableError();
        }
        this.#available = false;
    }

    markAvailable() {
        this.#available = true;
    }
}

class EconomyCar extends Car {
    constructor(make, model, rentalPricePerDay) {
        super(make, model, rentalPricePerDay);
    }
}

class LuxuryCar extends Car {
    #insuranceFee = 50;
    #premiumServiceFee = 30;

    constructor(make, model, rentalPricePerDay) {
        super(make, model, rentalPricePerDay);
    }

    getExtraFees() {
        return this.#insuranceFee + this.#premiumServiceFee;
    }
}

class Customer {
    #name;
    #contactInfo;
    #rentalHistory = [];

    constructor(name, contactInfo) {
        Validators.isNonEmptyStrig(name, "invalid customer name");
        Validators.isNonEmptyStrig(contactInfo, "invalid contact info");

        this.#name = name;
        this.#contactInfo = contactInfo;
    }

    get name() {
        return this.#name;
    }

    get rentalHistory() {
        return [...this.#rentalHistory];
    }

    addRental(rental) {
        Validators.isValidInstance(rental, Rental, "invalid rental");
        this.#rentalHistory.push(rental);
    }

    searchCars(cars, { make, model, minPrice, maxPrice } = {}) {
        return cars.filter(car => {
            return (
                car.available &&
                (!make || car.make === make) &&
                (!model || car.model === model) &&
                (!minPrice || car.rentalPricePerDay >= minPrice) &&
                (!maxPrice || car.rentalPricePerDay <= maxPrice)
            );
        });
    }
}

class StandartRental extends Rental {
    constructor(customer, car, rentalDuration, seasonFactor = 1, demandFactor = 1) {
        super(customer, car, rentalDuration);

        this.seasonFactor = seasonFactor;
        this.demandFactor = demandFactor;
    }

    rentCar() {
        this.car.markRented();
    }

    returnCar() {
        this.car.markAvailable();
        this.customer.addRental(this);
    }

    calculateRentalPrice() {
        let total =
            this.car.rentalPricePerDay *
            this.rentalDuration *
            this.seasonFactor *
            this.demandFactor;

        if (this.car instanceof LuxuryCar) {
            total += this.car.getExtraFees();
        }

        return total;
    }
}

const cars = [
    new EconomyCar("Toyota", "Corolla", 40),
    new EconomyCar("Hyundai", "Elantra", 45),
    new LuxuryCar("BMW", "X5", 120)
];

const customer = new Customer("Nelli", "nelli@mail.com");

const availableCars = customer.searchCars(cars, { maxPrice: 100 });
console.log("Available cars:", availableCars);

const rental = new StandartRental(customer, cars[2], 7, 1.2, 1.1);

rental.rentCar();
console.log("Total price:", rental.calculateRentalPrice());
rental.returnCar();

console.log("Rental history:", customer.rentalHistory);
