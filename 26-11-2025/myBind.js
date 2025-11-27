Function.prototype.myBind = function(thisArg, ...args1){
    const originalFunc = this;
    function boundFunc(...args2){
        return originalFunc.apply(
            this instanceof boundFunc ? this : thisArg,
            [...args1, ...args2]
        );
    } 

function fNOP(){}
    if(originalFunc.prototype){
        fNOP.prototype = originalFunc.prototype;
    }
    boundFunc.prototype = new fNOP();
    return boundFunc;
}