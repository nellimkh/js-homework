function ensureLoggerInterface(obj) {
    const required = ["log", "warn", "error"];

    for (let method of required) {
        if (typeof obj[method] !== "function") {
            throw new Error(`Object does not impplement required method: ${method}()`);
        }
    }

    return true; 
}


class ConsoleLogger {
    log(msg) {
        console.log("LOG:", msg);
    }

    warn(msg) {
        console.warn("WARN:", msg);
    }

    error(msg) {
        console.error("ERROR:", msg);
    }
}


class MemoryLogger {
    constructor() {
        this.messages = [];
    }

    log(msg) {
        this.messages.push({ type: "log", msg });
    }

    warn(msg) {
        this.messages.push({ type: "warn", msg });
    }

    error(msg) {
        this.messages.push({ type: "error", msg });
    }
}

class BadLogger {
    log(msg) {
        console.log("Just logging:", msg);
    }
}

const consoleLogger = new ConsoleLogger();
const memoryLogger = new MemoryLogger();
const badLogger = new BadLogger();

console.log("Checking valid loggers");
ensureLoggerInterface(consoleLogger); 
ensureLoggerInterface(memoryLogger);
console.log("Valid loggers passed!");

console.log("Checking invalid logger");
try {
    ensureLoggerInterface(badLogger);
} catch (err) {
    console.error("Rejected:", err.message);
}

