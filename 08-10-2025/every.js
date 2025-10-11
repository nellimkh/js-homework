function myEvery(arr, callback){
    for(let i = 0; i < arr.length; ++i){
        if(i in arr){
            if(!callback(arr[i], i, arr)){
                return false;
            }
        }
    }
    return true;
}

let res = myEvery([2, 4, 5, 6], num => num % 2 === 0);
console.log(res);
