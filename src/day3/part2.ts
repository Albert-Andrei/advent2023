// @ts-ignore
const fs = require('node:fs');
const path2 = require('path').resolve(__dirname, './input.txt');
const gears: number[] = [];

function getNumbersOnLine(line: string) {
  const matchesNumbers = [...line.matchAll(/\d+/g)];

  // Extract numbers and indices
  const numbersOnLine: { number: string; starIndex: number }[] =
    matchesNumbers.map((match) => ({
      number: match[0],
      starIndex: Number(match.index),
    }));

  return numbersOnLine;
}

fs.readFile(path2, 'utf8', (err: unknown, data: string) => {
  if (err) {
    console.error(err);
    return;
  }
  const allLines = data.split('\n');

  allLines.map((line, index) => {
    // getting all numbers and their index on the line
    const matches = [...line.matchAll(/[*]/g)];

    // Extract numbers and indices
    const stars: { star: string; index: number }[] = matches.map((match) => ({
      star: match[0],
      index: Number(match.index),
    }));

    // check if number is adjacent to a symbol
    stars.length > 0 &&
      stars.map((starObj) => {
        const starIndex = starObj.index;
        const validNumbers: number[] = [];

        // numbers on same line
        const numbers = getNumbersOnLine(line);
        // check on same line and add to array if adjacent to symbol
        numbers.map((num) => {
          const numberIndices = [...num.number].map(
            (_, index) => num.starIndex + index,
          );

          if (
            numberIndices.includes(starIndex - 1) ||
            numberIndices.includes(starIndex + 1)
          ) {
            validNumbers.push(Number(num.number));
          }
        });

        // check on line above
        const lineAbove = allLines[index - 1];
        if (lineAbove) {
          // numbers on the line
          const numbers = getNumbersOnLine(lineAbove);

          numbers.map((num) => {
            const numberIndices = [...num.number].map(
              (_, index) => num.starIndex + index,
            );
            if (
              numberIndices.includes(starIndex) ||
              numberIndices.includes(starIndex - 1) ||
              numberIndices.includes(starIndex + 1)
            ) {
              validNumbers.push(Number(num.number));
            }
          });
        }

        // check on line lower
        const lowerLine = allLines[index + 1];
        if (lowerLine) {
          // numbers on the line
          const numbers = getNumbersOnLine(lowerLine);

          numbers.map((num) => {
            const numberIndices = [...num.number].map(
              (_, index) => num.starIndex + index,
            );
            if (
              numberIndices.includes(starIndex) ||
              numberIndices.includes(starIndex - 1) ||
              numberIndices.includes(starIndex + 1)
            ) {
              validNumbers.push(Number(num.number));
            }
          });
        }

        if (validNumbers.length === 2) {
          const mul = validNumbers[0] * validNumbers[1];
          gears.push(mul);
        }
      });
  });

  const sum = gears.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);

  console.log('SUM > ', sum);
});
