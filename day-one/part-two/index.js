const readline = require("readline");
const fs = require("fs");

const digits = [
  { word: "one", number: "1" },
  { word: "two", number: "2" },
  { word: "three", number: "3" },
  { word: "four", number: "4" },
  { word: "five", number: "5" },
  { word: "six", number: "6" },
  { word: "seven", number: "7" },
  { word: "eight", number: "8" },
  { word: "nine", number: "9" },
];

const getAllIndexesOfString = (line, string) => {
  const indexes = [];
  let index = line.indexOf(string);
  while (index !== -1) {
    indexes.push(index);
    index = line.indexOf(string, index + 1);
  }
  return indexes;
};

const findCalibrationValuesOfTheLine = (line) => {
  let firstValue = null;
  let secondValue = null;

  digits.map((digit) => {
    const indexesOfWord = getAllIndexesOfString(line, digit.word);
    const indexesOfNumber = getAllIndexesOfString(line, digit.number);
    const biggestIndex = Math.max(...indexesOfWord, ...indexesOfNumber);
    const smallestIndex = Math.min(...indexesOfWord, ...indexesOfNumber);

    if (firstValue === null && secondValue === null) {
      firstValue = { index: smallestIndex, number: digit.number };
      secondValue = { index: biggestIndex, number: digit.number };
      return;
    }
    if (smallestIndex < firstValue.index) {
      firstValue = { index: smallestIndex, number: digit.number };
    }
    if (biggestIndex > secondValue.index) {
      secondValue = { index: biggestIndex, number: digit.number };
    }
    return;
  });

  return Number(firstValue.number + secondValue.number);
};

let result = 0;

const readInterface = readline.createInterface({
  input: fs.createReadStream("input.txt"),
});

readInterface.on("line", function (line) {
  const calibrationValues = findCalibrationValuesOfTheLine(line);
  result += calibrationValues;
});
