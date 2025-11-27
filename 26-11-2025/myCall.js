Function.prototype.myCall = function(thisArg, ...args){
    if(thisArg === null || thisArg === undefined){
        thisArg = globalThis;
    }
    thisArg = Object(thisArg);
    const m = Symbol();
    thisArg[m] = this;
    const result = thisArg[m](...args);
    delete thisArg[m];
    return result;
}