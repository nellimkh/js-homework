let str = "hello world";
function reverse_str(str){
    let reverse = '';
    for(let i = str.length - 1; i >= 0; --i){
        reverse += str[i];
    }
    return reverse;
}

    console.log(reverse_str(str)); 
    