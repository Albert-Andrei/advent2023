
export function getResult(line: string) {
  const game = {
    red: 0,
    blue: 0,
    green: 0,
  }

  const gameArray = line.split(':');
  const gameString = gameArray[1].split(';');

  // check if game is valid
  gameString.map((set) => {
    const allCubes = set.split(',');

    // check if set is valid 
    allCubes.map((colorCubes) => {
      const numberOfCubes = Number(colorCubes.replace(/[^0-9]/g, ""));
      
      if (colorCubes.includes('blue')) { 
        if (game.blue < numberOfCubes) {
          game.blue = numberOfCubes
        }

      } else if (colorCubes.includes('red')) {
        if (game.red < numberOfCubes) {
          game.red = numberOfCubes
        }

      } else if (colorCubes.includes('green')) {
        if (game.green < numberOfCubes) {
          game.green = numberOfCubes
        }
      }
    })
  })

  return game.green * game.blue * game.red
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
