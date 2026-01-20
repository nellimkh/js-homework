class DishNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "DishNotFoundError";
  }
}

class InvalidOrderError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidOrderError";
  }
}

class Dish {
  constructor(name, price) {
    if (!name || typeof name !== "string") throw new Error("Invalid dish name");
    if (price <= 0) throw new Error("Invalid price");
    this.name = name;
    this.price = price;
  }
}

class Appetizer extends Dish {}
class Entree extends Dish {
  constructor(name, price, prepTime) {
    super(name, price);
    this.prepTime = prepTime;
  }
}
class Dessert extends Dish {}

class Menu {
  #dishes;

  constructor() {
    if (new.target === Menu) {
      throw new Error("Menu is abstract");
    }
    this.#dishes = new Map();
  }

  addDish(dish) {
    this.#dishes.set(dish.name, dish);
  }

  removeDish(dishName) {
    this.#dishes.delete(dishName);
  }

  getDish(dishName) {
    return this.#dishes.get(dishName);
  }

  viewMenu() {
    return [...this.#dishes.values()];
  }
}

class AppetizersMenu extends Menu {}

class EntreesMenu extends Menu {
  addDish(dish) {
    if (!(dish instanceof Entree)) {
      throw new Error("Entree must include prep time");
    }
    super.addDish(dish);
  }
}

class DessertsMenu extends Menu {
  addDish(dish) {
    if (dish.price > 20) {
      throw new Error("Dessert price limit exceeded");
    }
    super.addDish(dish);
  }
}
class Customer {
  constructor(name, contactInfo) {
    if (!/^[A-Za-z ]+$/.test(name)) {
      throw new Error("Invalid customer name");
    }
    if (!contactInfo.includes("@") && !contactInfo.startsWith("+374")) {
      throw new Error("Invalid contact info");
    }

    this.name = name;
    this.contactInfo = contactInfo;
    this.orderHistory = [];
  }

  placeOrder(order) {
    this.orderHistory.push(order);
  }

  viewOrderHistory() {
    return this.orderHistory;
  }
}
class Order {
  #totalPrice = 0;

  constructor(customer) {
    this.customer = customer;
    this.dishes = [];
  }

  addDish(dishName, menus) {
    for (const menu of menus) {
      const dish = menu.getDish(dishName);
      if (dish) {
        this.dishes.push(dish);
        this.#totalPrice += dish.price;
        return;
      }
    }
    throw new DishNotFoundError(`Dis not found: ${dishName}`);
  }

  getTotal() {
    return this.#totalPrice;
  }

  viewSummary() {
    return {
      customer: this.customer.name,
      dishes: this.dishes.map(d => d.name),
      total: this.#totalPrice
    };
  }
}
const Validator = {
  dishName(name) {
    if (!name || typeof name !== "string") {
      throw new InvalidOrderError("Invalid dish name");
    }
  },
  price(price) {
    if (price <= 0) {
      throw new InvalidOrderError("Invalid price");
    }
  }
};
function withLogging(fn) {
  return function (...args) {
    console.log("LOG: start");
    const res = fn.apply(this, args);
    console.log("LOG: end");
    return res;
  };
}

function withDiscount(fn, { minTotal = 100, percent = 10, loyalOrders = 3 }) {
  return function (order) {
    const total = order.getTotal();
    if (total > minTotal || this.orderHistory.length >= loyalOrders) {
      order.finalTotal = total - (total * percent) / 100;
    } else {
      order.finalTotal = total;
    }
    return fn.call(this, order);
  };
}

function increasePrice(menu, dishName, percent) {
  const dish = menu.getDish(dishName);
  if (!dish) throw new DishNotFoundError("Dish not found");
  dish.price += dish.price * (percent / 100);
}

function decreasePrice(menu, dishName, percent) {
  const dish = menu.getDish(dishName);
  if (!dish) throw new DishNotFoundError("Dish not found");
  dish.price -= dish.price * (percent / 100);
}

function applyDemandPricing(menu, popularDishNames) {
  popularDishNames.forEach(name => {
    increasePrice(menu, name, 15);
  });
}

const appetizers = new AppetizersMenu();
const entrees = new EntreesMenu();
const desserts = new DessertsMenu();

appetizers.addDish(new Appetizer("Fries", 5));
entrees.addDish(new Entree("Steak", 40, 30));
desserts.addDish(new Dessert("Cake", 10));

const customer = new Customer("Nelli", "nelli@gmail.com");

let placeOrder = customer.placeOrder;
placeOrder = withLogging(placeOrder);
placeOrder = withDiscount(placeOrder, { minTotal: 50, percent: 20 });
customer.placeOrder = placeOrder;

const order = new Order(customer);
order.addDish("Fries", [appetizers, entrees, desserts]);
order.addDish("Steak", [appetizers, entrees, desserts]);

customer.placeOrder(order);

console.log(order.viewSummary());
console.log("Final total:", order.finalTotal);
