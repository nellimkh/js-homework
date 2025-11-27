Function.prototype.myApply = function(thisArg, argsArray){
    if(thisArg === null || thisArg === undefined){
        thisArg = globalThis;
    }
    thisArg = Object(thisArg);
    const m = Symbol();
    thisArg[m] = this;
    let result;

    if(argsArray === undefined){
        result = thisArg[m]();
    }else{
        if(!Array.isArray(argsArray) && typeof argsArray[Symbol.iterator] !== "function"){
            throw new TypeError("hajord argumente petq e lini zangvac");
        }
        result = thisArg[m](...argsArray);
    }
    delete thisArg[m];
    return result;
}