const scratchcardCopies: number[] = [];

function processLine(line: string) {
  const matches: string[] = [];
  const cardLine = line.split(':');
  const cardValues = cardLine[1].split('|');

  const winningArray = cardValues[0].split(' ').filter((c) => c !== '');
  const otherNumbers = cardValues[1].split(' ').filter((c) => c !== '');

  winningArray.map((numberStr) => {
    if (otherNumbers.includes(numberStr)) {
      matches.push(numberStr);
    }
  });
  scratchcardCopies.push(1);

  return matches.length;
}

const fsD42 = require('node:fs');
const pathD42 = require('path').resolve(__dirname, './input.txt');

fsD42.readFile(pathD42, 'utf8', (err: unknown, data: string) => {
  if (err) {
    console.error(err);
    return;
  }
  const matches = data.split('\n').map(processLine);
  let i = 0;

  while (i < matches.length) {
    const numCopies = scratchcardCopies[i];
    const count = matches[i];

    for (let j = i + 1; j < i + 1 + count; j++) {
      if (j < scratchcardCopies.length) {
        scratchcardCopies[j] += numCopies;
      }
    }

    i += 1;
  }

  const result = scratchcardCopies.reduce((acc, val) => acc + val, 0);
  console.log(result);
});
