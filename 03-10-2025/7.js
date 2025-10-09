let numList = [3, 6, 9, 12];
let valueToFind = 9;
let index = -1;

for (let i = 0; numList[i] !== undefined; i++) {
    if (numList[i] === valueToFind) {
        index = i;
        break;
    }
}

console.log(index); 
