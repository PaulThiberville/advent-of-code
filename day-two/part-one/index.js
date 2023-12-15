const readline = require("readline");
const fs = require("fs");

const config = {
  red: 12,
  green: 13,
  blue: 14,
};

const getBatchsInSet = (set) => {
  const batchStrings = set.split(",");
  const batchs = batchStrings.map((batchString) => {
    const batch = batchString.trim().split(" ");
    return {
      color: batch[1],
      quantity: batch[0],
    };
  });
  return batchs;
};

const checkIfSetIsPossible = (set) => {
  const batchs = getBatchsInSet(set);
  return batchs.every((batch) => batch.quantity <= config[batch.color]);
};

const getGameIsPossibleObject = (line) => {
  const [gameString, setsString] = line.split(":");
  const game = parseInt(gameString.split(" ")[1]);
  const sets = setsString.split(";");
  const isPossible = sets.every((set) => checkIfSetIsPossible(set));
  const getGameIsPossibleObject = { game, isPossible };
  return getGameIsPossibleObject;
};

let result = 0;

const readInterface = readline.createInterface({
  input: fs.createReadStream("input.txt"),
});

readInterface.on("line", function (line) {
  const gameIsPossibleObject = getGameIsPossibleObject(line);
  if (gameIsPossibleObject.isPossible) {
    result += gameIsPossibleObject.game;
  }
  console.log(result);
});
