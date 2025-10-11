function myMap(array, callback){
    let result = [];
    for(let i = 0;i < array.length; ++i){
        if(i in array){
            result.push(callback(array[i], i, array));
        }
    }
    return result;
}

const arr = myMap([1, 2, 3], (x) => x * 2);
console.log(arr);
