const input = [
  ['0', 'M', '0', 'M', '0'],
  ['0', '0', 'M', '0', '0'],
  ['0', '0', '0', '0', '0'],
  ['M', 'M', '0', '0', '0'],
  ['0', '0', '0', 'M', '0']
];

const n = input.length;

const directions = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1],          [0, 1],
  [1, -1],  [1, 0], [1, 1]
];

const output = [];

for (let i = 0; i < n; i++) {
  output[i] = [];
  for (let j = 0; j < n; j++) {
    if (input[i][j] === 'M') {
      output[i][j] = 'M';
    } else {
      let count = 0;
      for (const [dx, dy] of directions) {
        const ni = i + dx;
        const nj = j + dy;
        if (
          ni >= 0 && ni < n &&
          nj >= 0 && nj < n &&
          input[ni][nj] === 'M'
        ) {
          count++;
        }
      }
      output[i][j] = count;
    }
  }
}

for (const row of output) {
  console.log(row.join(' '));
}
