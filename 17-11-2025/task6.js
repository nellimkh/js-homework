const obj = {};

obj.name = "Nelli";

Object.defineProperty(obj, "secret", {
    value: 123,
    enumerable: false,
    writable: true,
    configurable: true
});

console.log(Object.keys(obj));
console.log(Object.getOwnPropertyNames(obj));
