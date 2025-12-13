function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        reject(new TypeError("..."));
        return;
    }

    if (x instanceof MyPromise) {
        if (x.state === "fulfilled") {
            resolve(x.value);
        } else if (x.state === "rejected") {
            reject(x.reason);
        } else {
            x.then(
                y => resolvePromise(promise2, y, resolve, reject),
                r => reject(r)
            );
        }
        return;
    }

    if (x !== null && (typeof x === "object" || typeof x === "function")) {
        let then;
        let called = false;

        try {
            then = x.then;
        } catch (e) {
            reject(e);
            return;
        }

        if (typeof then === "function") {
            try {
                then.call(
                    x,
                    y => {
                        if (called) return;
                        called = true;
                        resolvePromise(promise2, y, resolve, reject);
                    },
                    r => {
                        if (called) return;
                        called = true;
                        reject(r);
                    }
                );
            } catch (e) {
                if (!called) {
                    called = true;
                    reject(e);
                }
            }
            return;
        }
    }

    resolve(x);
}



// 8


MyPromise.prototype.catch = function (onRejected) {
    return this.then(undefined, onRejected);
};



// 9

new MyPromise(res => res(5))
  .then(v => console.log("fulfilled:", v));

new MyPromise((_, rej) => rej("error"))
  .catch(e => console.log("rejected:", e));
console.log("A");
new MyPromise(res => res("B"))
  .then(v => console.log(v));
console.log("C");
new MyPromise(res => res(2))
  .then(v => v * 2)
  .then(v => console.log("chained value:", v));

new MyPromise(res => res(1))
  .then(() => { throw "boom"; })
  .catch(e => console.log("caught:", e));

new MyPromise(res => res(1))
  .then(v => new MyPromise(r => r(v + 1)))
  .then(v => console.log("chained promise:", v));

new MyPromise(res => res())
  .then(() => ({
      then(resolve) { resolve(10); }
  }))
  .then(v => console.log("thenable value:", v));

new MyPromise(res => res())
  .then(() => ({
      then(resolve, reject) {
          resolve(1);
          reject(2);
          resolve(3);
      }
  }))
  .then(v => console.log("double resolution:", v));

let p2;
const p1 = new MyPromise(res => res());
p2 = p1.then(() => p2)
       .catch(e => console.log("self-resolution error:", e));