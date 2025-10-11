function my_forEach(array, callback){
    for (let i = 0; i < array.length; ++i){
        if(i in array){
            callback(array[i], i, array);
        }
    }
}

my_forEach([1, ,3], function(value, index, arr){
    console.log(index, value);
    
});