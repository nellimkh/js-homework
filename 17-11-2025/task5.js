function myCreate(proto) {
    const obj = {};
    Object.setPrototypeOf(obj, proto);
    return obj;
}

const obj = myCreate({ a: 10 });

console.log(obj.a);    
console.log(Object.getPrototypeOf(obj)); 
obj.b = 20;
