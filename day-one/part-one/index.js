const readline = require("readline");
const fs = require("fs");

const findCalibrationValuesOfTheLine = (line) => {
  const filteredLine = line.match(/\d/g);
  const lastIndex = filteredLine.length - 1;
  const calibrationValues = filteredLine[0] + filteredLine[lastIndex];
  return calibrationValues;
};

let result = 0;

const readInterface = readline.createInterface({
  input: fs.createReadStream("input.txt"),
});

readInterface.on("line", function (line) {
  const calibrationValues = findCalibrationValuesOfTheLine(line);
  result += Number(calibrationValues);
  console.log(result);
});
