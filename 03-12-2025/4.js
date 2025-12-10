function ensurePaymentInterface(obj) {
    const required = ["pay", "refund", "getStatus"];

    for (let method of required) {
        if (typeof obj[method] !== "function") {
            throw new Error(`Missing required method: ${method}()`);
        }
    }
}


class StripePayment {
    constructor() {
        this.transactions = {}; 
        this.counter = 1;
    }

    pay(amount) {
        const id = this.counter++;
        this.transactions[id] = { amount, status: "paid" };
        console.log(`Stripe: Paid $${amount}. Transaction ID = ${id}`);
        return id;
    }

    refund(id) {
        if (!this.transactions[id]) {
            console.log("Stripe: Invalid Transaction ID");
            return;
        }
        this.transactions[id].status = "refunded";
        console.log(`Stripe: Refunded transaction ${id}`);
    }

    getStatus(id) {
        return this.transactions[id] || null;
    }
}


class PayPalPayment {
    constructor() {
        this.transactions = {};
        this.counter = 100;
    }

    pay(amount) {
        const id = this.counter++;
        this.transactions[id] = { amount, status: "completed" };
        console.log(`PayPal: Paid $${amount}. Transaction ID = ${id}`);
        return id;
    }

    refund(id) {
        if (!this.transactions[id]) {
            console.log("PayPal: Invalid Transaction ID");
            return;
        }
        this.transactions[id].status = "refunded";
        console.log(`PayPal: Refunded transaction ${id}`);
    }

    getStatus(id) {
        return this.transactions[id] || null;
    }
}



class BadPaymentSystem {
    pay(amount) {
        console.log("Paying", amount);
    }
}


const stripe = new StripePayment();
const paypal = new PayPalPayment();
const bad = new BadPaymentSystem();

console.log("Validating payment interfaces");

ensurePaymentInterface(stripe);
console.log("Stripe OK");

ensurePaymentInterface(paypal);
console.log("PayPal OK");

console.log("Testing bad payment system");
try {
    ensurePaymentInterface(bad);
} catch (e) {
    console.error("Rejected:", e.message);
}
