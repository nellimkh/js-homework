function pingFiveSeconds(){
    const interval = setInterval(() => {
        console.log("Ping");
        
    }, 1000);

    setTimeout(() => {
        clearInterval(interval);
        console.log("Stop");
        
    }, 5000);
}

pingFiveSeconds();
