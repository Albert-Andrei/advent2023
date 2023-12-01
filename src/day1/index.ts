import { getNumberFromString } from "./part1";
import { extractNumbersFromString } from "./part2";

// @ts-ignore
const fs = require("node:fs");
const path = require('path').resolve(__dirname, './input.txt')

fs.readFile(path, "utf8", (err: unknown, data: string) => {
  if (err) {
    console.error(err);
    return;
  }
  const part1 = data.split("\n").map(getNumberFromString);
  const sum1 = part1.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
  console.log("Challenge 1 result: ", sum1);


  const part2 = data.split("\n").map(extractNumbersFromString);
  const sum2 = part2.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
  console.log("Challenge 2 result: ", sum2);
});
