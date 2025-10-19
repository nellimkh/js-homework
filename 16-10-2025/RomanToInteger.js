/**
 * @param {string} s
 * @return {number}
 */
function romanToInt(s) {
    const values = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000
    };

    let sum = 0;

    for (let i = 0; i < s.length; i++) {
        const current = values[s[i]];
        const next = values[s[i + 1]];

        if (current < next) {
            sum -= current;
        } else {
            sum += current;
        }
    }

    return sum;
}

console.log(romanToInt("LVIII"));    
console.log(romanToInt("MCMXCIV"));  