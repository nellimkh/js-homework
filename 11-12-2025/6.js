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
        onFulfilled = typeof onFulfilled === "function" ? onFulfilled : value => value;
        onRejected = typeof onRejected === "function" ? onRejected : reason => { throw reason; };

        const asyncRun = (fn) => {
            if (typeof queueMicrotask === "function") {
                queueMicrotask(fn);
            } else {
                setTimeout(fn, 0);
            }
        };

        const promise2 = new MyPromise((resolve, reject) => {
            if (this.state === "fulfilled") {
                asyncRun(() => {
                    try {
                        const x = onFulfilled(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                });
            } else if (this.state === "rejected") {
                asyncRun(() => {
                    try {
                        const x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                });
            } else {
                this.onFulfilledCallbacks.push((value) => {
                    asyncRun(() => {
                        try {
                            const x = onFulfilled(value);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    });
                });

                this.onRejectedCallbacks.push((reason) => {
                    asyncRun(() => {
                        try {
                            const x = onRejected(reason);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    });
                });
            }
        });

        return promise2;
    }
}
