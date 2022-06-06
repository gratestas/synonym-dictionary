const fs = require("fs");

const { Dictionary } = require("./Dictionary.js");

const data = fs.readFileSync("input_big.json", "utf8");
const parsedData = JSON.parse(data);

const output = [];
let pairCounter = 1;

for (let testCase of parsedData.testCases) {
  const dictionary = new Dictionary();
  let {
    N: dictionaryLength,
    Q: queryLength,
    dictionary: dictionaryContent,
    queries,
  } = testCase;

  for (let i = 0; i < dictionaryLength; i++) {
    let [wordOne, wordTwo] = dictionaryContent[i];
    dictionary.addPair(wordOne, wordTwo);
  }

  for (let i = 0; i < queryLength; i++) {
    let [queryOne, queryTwo] = queries[i];
    let answer = dictionary.areSynonyms(queryOne, queryTwo);
    //console.log(`${pairCounter}. ${queryOne} and ${queryTwo} are ${answer}`);
    output.push(`${pairCounter}. ${answer}`);
    pairCounter++;
  }
}
console.log(output);

fs.writeFileSync("test.out", output.join("\n"));
