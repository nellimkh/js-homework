const str = "Learning JavaScript";
const sub = "Java";

let found = false;

for (let i = 0; str[i] !== undefined; i++) {
    let match = true;
    for (let j = 0; sub[j] !== undefined; j++) {
        if (str[i + j] !== sub[j]) {
            match = false;
            break;
        }
    }
    if (match) {
        found = true;
        break;
    }
}

console.log(found); 
