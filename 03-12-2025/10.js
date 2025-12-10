// 1. Abstract Controller
class Controller {
    constructor() {
        if (new.target === Controller) {
            throw new Error("Controller is abstract and cannot be instantiated directly.");
        }
    }

    handleRequest(request) {
        throw new Error("handleRequest() must be implemented");
    }

    validate(request) {
        throw new Error("validate() must be implemented");
    }

    respond(data) {
        console.log(JSON.stringify({ status: "success", data }, null, 2));
    }
}
// 2. Service Interface 
function ensureServiceInterface(obj) {
    const required = ["execute", "getName"];
    for (let method of required) {
        if (typeof obj[method] !== "function") {
            throw new Error(`Service does not implement required method: ${method}()`);
        }
    }
}

// 3. Mixins
// Loggable Mixin
const Loggable = Base => class extends Base {
    log(message) {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] [${this.constructor.name}]: ${message}`);
    }
};

// Configurable Mixin
const Configurable = Base => class extends Base {
    constructor(...args) {
        super(...args);
        this.config = {};
    }

    setConfig(key, value) {
        this.config[key] = value;
    }

    getConfig(key) {
        return this.config[key];
    }
};

// 4. Services
class UserService {
    constructor() {
        this.users = [
            { id: 1, name: "Alice" },
            { id: 2, name: "Bob" },
        ];
    }

    execute(params) {
        return this.users;
    }

    getName() {
        return "UserService";
    }
}

ensureServiceInterface(new UserService());
// 5. Controllers
// UserController: Controller + Loggable
class UserController extends Loggable(Controller) {
    constructor(service) {
        super();
        ensureServiceInterface(service);
        this.service = service;
    }

    validate(request) {
        if (!request || !request.action) {
            throw new Error("Invalid request: missing action");
        }
        this.log(`Request validated for action: ${request.action}`);
    }

    handleRequest(request) {
        this.validate(request);
        if (request.action === "getUsers") {
            const result = this.service.execute();
            this.log(`Fetched users: ${result.length}`);
            this.respond(result);
        } else {
            throw new Error(`Unknown action: ${request.action}`);
        }
    }
}

// ProductController: Controller + Loggable + Configurable
class ProductController extends Configurable(Loggable(Controller)) {
    constructor(service) {
        super();
        ensureServiceInterface(service);
        this.service = service;
    }

    validate(request) {
        if (!request || !request.action) {
            throw new Error("Invalid request: missing action");
        }
        this.log(`Request validated for action: ${request.action}`);
    }

    handleRequest(request) {
        this.validate(request);
        const discount = this.getConfig("discount") || 0;

        if (request.action === "getProducts") {
            let products = this.service.execute();
            if (discount > 0) {
                products = products.map(p => ({ ...p, price: p.price * (1 - discount) }));
                this.log(`Applied discount: ${discount * 100}%`);
            }
            this.respond(products);
        } else {
            throw new Error(`Unknown action: ${request.action}`);
        }
    }
}

// 6. Product Service
class ProductService {
    constructor() {
        this.products = [
            { id: 1, name: "Laptop", price: 1500 },
            { id: 2, name: "Phone", price: 800 },
        ];
    }

    execute(params) {
        return this.products;
    }

    getName() {
        return "ProductService";
    }
}

ensureServiceInterface(new ProductService());

// 7. Scenario / Demo
console.log("=== UserController Demo ===");
const userService = new UserService();
const userController = new UserController(userService);

userController.handleRequest({ action: "getUsers" });

console.log("\n=== ProductController Demo ===");
const productService = new ProductService();
const productController = new ProductController(productService);

productController.setConfig("discount", 0.1);
productController.handleRequest({ action: "getProducts" });
