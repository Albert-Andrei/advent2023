export function getResult(line: string) {
  const matches: number[] = [];
  const cardLine = line.split(':');
  const cardValues = cardLine[1].split('|');

  const winningArray = cardValues[0].split(' ').filter((c) => c !== '');
  const otherNumbers = cardValues[1].split(' ').filter((c) => c !== '');

  winningArray.map((numberStr) => {
    if (otherNumbers.includes(numberStr)) {
      matches.push(Number(numberStr));
    }
  });

  let points = 0;

  if (matches.length > 0) {
    points = 1;
    for (let i = 1; i < matches.length; i++) {
      points *= 2;
    }
  }

  return points;
}

// @ts-ignore
const fs = require('node:fs');
const path = require('path').resolve(__dirname, './input.txt');

fs.readFile(path, 'utf8', (err: unknown, data: string) => {
  if (err) {
    console.error(err);
    return;
  }
  const result = data.split('\n').map(getResult);
  const sum = result.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
  console.log(sum);
});
