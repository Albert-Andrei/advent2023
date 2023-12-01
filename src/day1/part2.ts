const numAsStrings: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "one", "two", "three", "four", "five", "six","seven", "eight", "nine"];

function parseNumberFromString(input: string) {
  switch (input) {
    case "1":
      return 1;
    case "2":
      return 2;
    case "3":
      return 3;
    case "4":
      return 4;
    case "5":
      return 5;
    case "6":
      return 6;
    case "7":
      return 7;
    case "8":
      return 8;
    case "9":
      return 9;
    case "one":
      return 1;
    case "two":
      return 2;
    case "three":
      return 3;
    case "four":
      return 4;
    case "five":
      return 5;
    case "six":
      return 6;
    case "seven":
      return 7;
    case "eight":
      return 8;
    case "nine":
      return 9;
    default:
      return 0;
  }
}

export function extractNumbersFromString(word: string) {
  const lowercaseWord = word.toLowerCase();
  const numbers: {index: number, number: string}[] = [];
    
  numAsStrings.map((num) => {
    if (lowercaseWord.includes(num)) {
      let startIndex = 0, index;
      while ((index = lowercaseWord.indexOf(num, startIndex)) > -1) {
          startIndex = index + num.length;
          numbers.push({index: index, number: num});
      }
    }
  });

  const sorted = numbers.sort((a, b) => a.index - b.index);

  if (sorted.length === 1) {
    const number = parseNumberFromString(sorted[0].number);
    return number * 11;
  } else {
    const numbersFromWord = sorted.map((item) => parseNumberFromString(item.number));
    const finalNumber = numbersFromWord[0].toString() + numbersFromWord[numbersFromWord?.length - 1].toString();
    return Number(finalNumber);
  }
}

// @ts-ignore
// const fs = require("node:fs");
// const path = require('path').resolve(__dirname, './input.txt')
// fs.readFile(path, "utf8", (err: unknown, data: string) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   const result = data.split("\n").map(extractNumbersFromString);
//   const sum = result.reduce((accumulator, currentValue) => {
//     return accumulator + currentValue;
//   }, 0);
//   console.log(sum);
// });
