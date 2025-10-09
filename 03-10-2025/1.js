function my_str_len(str){
    let len = 0;
    for(let i = 0; str[i] !== str[undefined]; ++i ){
        len++;

    }
    return len;
}
console.log(my_str_len("hello world"));
