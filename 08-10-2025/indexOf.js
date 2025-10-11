function myIndexOf(arr, searchElem){
    for(let i = 0; i < arr.length; ++i){
        if(arr[i] === searchElem){
            return i;
        }
    }
    return -1;
}

let arr = [10, 20, 40, 50];
console.log(myIndexOf(arr, 20)); // 1
console.log(myIndexOf(arr, 30));// -1

