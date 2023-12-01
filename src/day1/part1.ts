export function getNumberFromString(str: string) {
  const chars = [...str];
  let numbers: string[] = [];

  try {
    chars?.forEach((char) => {
      const parsedChar = Number(char);
      if (!isNaN(parsedChar) && char !== " ") {
        numbers.push(char);
      }
    });
    
    if (numbers.length === 1) {
      const finalNumber = numbers[0] + numbers[0];
      numbers = [];
      return Number(finalNumber);
    } else { 
      const finalNumber = numbers[0] + numbers[numbers?.length - 1];
      numbers = [];
      return Number(finalNumber);      
    }
  } catch (error) {
    console.log("You fucked up: ", error);
  }
  return 0
}

// @ts-ignore
// const fs = require("node:fs");
// const path = require('path').resolve(__dirname, './input.txt')

// fs.readFile(path, "utf8", (err: unknown, data: string) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   const result = data.split("\n").map(getNumberFromString);
//   const sum = result.reduce((accumulator, currentValue) => {
//     return accumulator + currentValue;
//   }, 0);
//   console.log(sum);
// });
