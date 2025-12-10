function asyncDouble(n){
    return new Promise((resolve) =>{
        setTimeout(() => {
            resolve(n * 2);
        }, 300);
    });
}

asyncDouble(5).then(result =>{
    console.log(result);
    
});