
export function getResult(line: string) {
  let isGameValid = true;

  const gameArray = line.split(':');

  const gameId = gameArray[0].slice(5)
  const game = gameArray[1].split(';');

  // check if game is valid
  game.map((set) => {
    const allCubes = set.split(',');

    // check if set is valid 
    allCubes.map((colorCubes) => {
      const numberOfCubes = Number(colorCubes.replace(/[^0-9]/g, ""));
      
      if (colorCubes.includes('blue')) { 
        if (numberOfCubes > 14) {
          isGameValid = false;
        }

      } else if (colorCubes.includes('red')) {
        if (numberOfCubes > 12) {
          isGameValid = false;
        }

      } else if (colorCubes.includes('green')) {
        if (numberOfCubes > 13) {
          isGameValid = false;
        }
      }
    })
  })
  

  if (isGameValid) {
    return Number(gameId)
  }
  return 0
}

// @ts-ignore
const fs = require("node:fs");
const path = require('path').resolve(__dirname, './input.txt')

fs.readFile(path, "utf8", (err: unknown, data: string) => {
  if (err) {
    console.error(err);
    return;
  }
  const result = data.split("\n").map(getResult);
  const sum = result.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
  console.log(sum);
});
