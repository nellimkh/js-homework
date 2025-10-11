function myFilter(array, callback){
    let res = [];
    for(let i = 0; i < array.length; ++i){
        if(i in array){
       if(callback(array[i], i, array)){
        res.push(array[i]);
       }
    }
    }
    return res;
}

let even = myFilter([10, 15, 20, 25, 30], num => num % 2 === 0);
console.log(even);
  