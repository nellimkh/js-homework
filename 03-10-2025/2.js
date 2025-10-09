let str= "hello world"
function Small_to_big(str){
let arr = [];
for(let i = 0; str[i] != str[undefined]; ++i)
{
    if(str[i] >= 'a' && str[i] <= 'z'){
        arr.push(str[i].toUpperCase());
    }else{
        arr.push(str[i]);
    }

}
return arr.join('');
}
console.log(Small_to_big(str));



