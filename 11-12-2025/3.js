class MyPromise {
    constructor(executor) {
        this.state = "pending";
        this.value = undefined;
        this.reason = undefined;
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];

        const resolve = (value) => {
            if (this.state !== "pending") return;
            this.state = "fulfilled";
            this.value = value;
            this.onFulfilledCallbacks.forEach(fn => {
                if (typeof fn === "function") fn(this.value);
            });
        };

        const reject = (reason) => {
            if (this.state !== "pending") return;
            this.state = "rejected";
            this.reason = reason;
            this.onRejectedCallbacks.forEach(fn => {
                if (typeof fn === "function") fn(this.reason);
            });
        };

        try {
            executor(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }

    then(onFulfilled, onRejected) {
        if (this.state === "fulfilled") {
            if (typeof onFulfilled === "function") {
                onFulfilled(this.value);
            }
        } else if (this.state === "rejected") {
            if (typeof onRejected === "function") {
                onRejected(this.reason);
            }
        } else {
            this.onFulfilledCallbacks.push(onFulfilled);
            this.onRejectedCallbacks.push(onRejected);
        }
    }
}
