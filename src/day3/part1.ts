// @ts-ignore
const fs = require('node:fs');
const path = require('path').resolve(__dirname, './input.txt');

fs.readFile(path, 'utf8', (err: unknown, data: string) => {
  if (err) {
    console.error(err);
    return;
  }
  const validNumbers: number[] = [];
  const allLines = data.split('\n');

  allLines.map((line, index) => {
    // getting all numbers and their index on the line
    const matches = [...line.matchAll(/\d+/g)];

    // Extract numbers and indices
    const numbers = matches.map((match) => ({
      number: match[0],
      index: match.index,
    }));

    // check if number is adjacent to a symbol
    numbers.length > 0 &&
      numbers.map((numObj) => {
        const numberString = numObj.number;
        const numIndex = numObj.index || 0;
        const numLength = numberString.length;
        const numEndIndex = numIndex + numLength;

        // check on same line and add to array if adjacent to symbol
        const prevChar = line[numIndex - 1];
        const nextChar = line[numEndIndex];

        if (prevChar && prevChar !== '.' && !/^\d+$/.test(prevChar)) {
          validNumbers.push(Number(numberString));
          return;
        }

        if (nextChar && nextChar !== '.' && !/^\d+$/.test(nextChar)) {
          validNumbers.push(Number(numberString));
          return;
        }

        // check on line above
        const lineAbove = allLines[index - 1];
        if (lineAbove) {
          // gating chars same place as number but on line above
          const possibleValidCharsLineAbove = lineAbove.slice(
            numIndex,
            numEndIndex,
          );
          const hasSymbolsLineAbove =
            [...possibleValidCharsLineAbove]
              .filter((c) => c !== '.')
              ?.filter((c) => !/^\d+$/.test(c))?.length > 0;

          if (hasSymbolsLineAbove) {
            validNumbers.push(Number(numberString));
            return;
          }

          if (prevChar) {
            const prevCharToCheck = lineAbove[numIndex - 1];
            if (prevCharToCheck !== '.' && !/^\d+$/.test(prevCharToCheck)) {
              validNumbers.push(Number(numberString));
              return;
            }
          }

          if (nextChar) {
            const nextCharToCheck = lineAbove[numEndIndex];
            if (nextCharToCheck !== '.' && !/^\d+$/.test(nextCharToCheck)) {
              validNumbers.push(Number(numberString));
              return;
            }
          }
        }

        // check on line lower
        const lowerLine = allLines[index + 1];
        if (lowerLine) {
          // gating chars same place as number but on line above
          const possibleValidChars = lowerLine.slice(numIndex, numEndIndex);
          const hasSymbols =
            [...possibleValidChars]
              .filter((c) => c !== '.')
              ?.filter((c) => !/^\d+$/.test(c))?.length > 0;

          if (hasSymbols) {
            validNumbers.push(Number(numberString));
            return;
          }

          if (prevChar) {
            const charToCheckPrev = lowerLine[numIndex - 1];
            if (charToCheckPrev !== '.' && !/^\d+$/.test(charToCheckPrev)) {
              validNumbers.push(Number(numberString));
              return;
            }
          }

          if (nextChar) {
            const charToCheckNext = lowerLine[numEndIndex];
            if (charToCheckNext !== '.' && !/^\d+$/.test(charToCheckNext)) {
              validNumbers.push(Number(numberString));
              return;
            }
          }
        }
      });
  });

  const sum = validNumbers.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);

  console.log('SUM > ', sum);
});
