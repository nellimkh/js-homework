class MyPromise {
    constructor(executor) {
        this.state = "pending";
        this.value = undefined;
        this.reason = undefined;
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];

        const asyncRun = (fn) => {
            if (typeof queueMicrotask === "function") {
                queueMicrotask(fn);
            } else {
                setTimeout(fn, 0);
            }
        };

        const resolve = (value) => {
            if (this.state !== "pending") return;
            this.state = "fulfilled";
            this.value = value;
            this.onFulfilledCallbacks.forEach(fn =>
                asyncRun(() => fn(this.value))
            );
        };

        const reject = (reason) => {
            if (this.state !== "pending") return;
            this.state = "rejected";
            this.reason = reason;
            this.onRejectedCallbacks.forEach(fn =>
                asyncRun(() => fn(this.reason))
            );
        };

        try {
            executor(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }

    then(onFulfilled, onRejected) {
        const asyncRun = (fn) => {
            if (typeof queueMicrotask === "function") {
                queueMicrotask(fn);
            } else {
                setTimeout(fn, 0);
            }
        };

        if (this.state === "fulfilled") {
            if (typeof onFulfilled === "function") {
                asyncRun(() => onFulfilled(this.value));
            }
        } else if (this.state === "rejected") {
            if (typeof onRejected === "function") {
                asyncRun(() => onRejected(this.reason));
            }
        } else {
            this.onFulfilledCallbacks.push(
                typeof onFulfilled === "function" ? onFulfilled : () => {}
            );
            this.onRejectedCallbacks.push(
                typeof onRejected === "function" ? onRejected : () => {}
            );
        }
    }
}
