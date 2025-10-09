function containsSubstring(str, sub) {
    for (let i = 0; str[i] !== undefined; i++) {
        let match = true;
        for (let j = 0; sub[j] !== undefined; j++) {
            if (str[i + j] !== sub[j]) {
                match = false;
                break;
            }
        }
        if (match) {
            return true;
        }
    }
    return false;
}

console.log(containsSubstring("hello world", "world")); 
