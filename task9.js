class OutOfStockError extends Error {
  constructor(message) {
    super(message);
    this.name = "OutOfStockError";
  }
}

class InvalidInputError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidInputError";
  }
}

class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.name = "AuthenticationError";
  }
}

class Product {
  #name;
  #price;
  #description;
  #stock;

  constructor(name, price, description, stock) {
    this.name = name;
    this.price = price;
    this.description = description;
    this.stock = stock;
    this.reviews = [];
  }

  get name() { return this.#name; }
  set name(value) {
    if (!value) throw new InvalidInputError("Invalid product name");
    this.#name = value;
  }

  get price() { return this.#price; }
  set price(value) {
    if (value < 0) throw new InvalidInputError("Price cannot be negative");
    this.#price = value;
  }

  get stock() { return this.#stock; }
  set stock(value) {
    if (!Number.isInteger(value) || value < 0)
      throw new InvalidInputError("Invalid stock");
    this.#stock = value;
  }

  getDetails() { throw new Error("Abstract method"); }
  updateStock(delta) { throw new Error("Abstract method"); }
}

class Electronics extends Product {
  constructor(name, price, description, stock, brand) {
    super(name, price, description, stock);
    this.brand = brand;
  }

  getDetails() {
    return `Electronics: ${this.name} by ${this.brand}, $${this.price}`;
  }

  updateStock(delta) {
    const newStock = this.stock + delta;
    if (newStock < 0) throw new OutOfStockError("Not enough stock");
    this.stock = newStock;
  }
}

class Clothing extends Product {
  constructor(name, price, description, stock, size) {
    super(name, price, description, stock);
    this.size = size;
  }

  getDetails() {
    return `Clothing: ${this.name} size ${this.size}, $${this.price}`;
  }

  updateStock(delta) {
    const newStock = this.stock + delta;
    if (newStock < 0) throw new OutOfStockError("Not enough stock");
    this.stock = newStock;
  }
}

class Customer {
  #name;
  #contact;
  #authenticated;

  constructor(name, contact, authenticated = true) {
    this.name = name;
    this.contact = contact;
    this.orderHistory = [];
    this.cart = new Map();
    this.#authenticated = authenticated;
  }

  isAuthenticated() { return this.#authenticated; }

  searchProducts(products, query) {
    return products.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  addToCart(product, qty) {
    if (qty <= 0 || qty > product.stock) {
      throw new OutOfStockError("Invalid quantity");
    }
    const existing = this.cart.get(product) || 0;
    this.cart.set(product, existing + qty);
  }

  viewCart() {
    return [...this.cart.entries()].map(
      ([p, qty]) => `${p.getDetails()} x ${qty}`
    );
  }

  checkout() {
    if (!this.cart.size) return 0;

    let total = 0;
    for (const [product, qty] of this.cart.entries()) {
      product.updateStock(-qty);
      total += product.price * qty;
    }

    const order = new Order(this, new Map(this.cart));
    order.placeOrder();
    this.orderHistory.push(order);
    this.cart.clear();
    return total;
  }

  hasPurchased(product) {
    return this.orderHistory.some(order =>
      [...order.products.keys()].includes(product)
    );
  }
}

class Order {
  constructor(customer, products) {
    this.customer = customer;
    this.products = products;
    this.timestamp = new Date();
    this.total = [...products.entries()].reduce(
      (sum, [p, qty]) => sum + p.price * qty,
      0
    );
  }

  placeOrder() {
    return this;
  }
}

class Review {
  constructor(product, customer, rating, comment) {
    if (rating < 1 || rating > 5) throw new InvalidInputError("Invalid rating");
    this.product = product;
    this.customer = customer;
    this.rating = rating;
    this.comment = comment;
  }
}

class ShopService {
  withLogging(action, label) {
    return (...args) => {
      console.log(`[LOG] ${label}`, args);
      return action(...args);
    };
  }

  withPermission(action) {
    return (customer, product, rating, comment) => {
      if (!customer.isAuthenticated()) {
        throw new AuthenticationError("User not authenticated");
      }
      if (!customer.hasPurchased(product)) {
        throw new AuthenticationError("Cannot review without purchase");
      }
      return action(customer, product, rating, comment);
    };
  }
}

const phone = new Electronics("iPhone 14", 999, "Latest Apple phone", 10, "Apple");
const tshirt = new Clothing("T-Shirt", 20, "Cotton", 50, "M");

const customer = new Customer("Nelli", "nelli@mail.com", true);
const products = [phone, tshirt];

const service = new ShopService();

const searchWithLog = service.withLogging(
  customer.searchProducts.bind(customer),
  "SEARCH_PRODUCTS"
);

const reviewWithPerm = service.withPermission(
  (customer, product, rating, comment) => {
    const review = new Review(product, customer, rating, comment);
    product.reviews.push(review);
    return review;
  }
);

console.log("Search results:", searchWithLog(products, "iPhone"));

customer.addToCart(phone, 2);
const total = customer.checkout();
console.log("Total checkout:", total);

const review = reviewWithPerm(customer, phone, 5, "Excellent!");
console.log("Review added:", review);
