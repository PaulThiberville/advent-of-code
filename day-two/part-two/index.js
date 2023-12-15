const readline = require("readline");
const fs = require("fs");

const getMinimums = (line) => {
  const setsString = line.split(":")[1];
  const sets = setsString.split(";");
  const minimums = sets.reduce((acc, set) => {
    const newAcc = { ...acc };
    const batchs = set.split(",");
    batchs.forEach((batch) => {
      const [quantity, color] = batch.trim().split(" ");
      if (!newAcc[color] || parseInt(quantity, 10) > newAcc[color]) {
        newAcc[color] = parseInt(quantity, 10);
      }
    });
    return newAcc;
  }, {});
  return minimums;
};

let result = 0;

const readInterface = readline.createInterface({
  input: fs.createReadStream("input.txt"),
});

readInterface.on("line", function (line) {
  const minimums = getMinimums(line);
  const power = minimums.red * minimums.blue * minimums.green;
  result += power;
  console.log(result);
});
