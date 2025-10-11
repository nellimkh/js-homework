function mySome(arr, callback){
    for(let i = 0; i < arr.length; ++i){
        if(i in arr){
            if(callback(arr[i], i, arr)){
                return true;
            }
        }
    }
    return false;
}

let res = mySome([1, 5, 4, 9], num => num % 3 === 0);
console.log(res);


