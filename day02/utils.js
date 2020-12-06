const path = require('path')
const fs = require('fs')
const readline = require('readline')

function createInputFileReadLineInterface() {
  const inputFilepath = path.resolve(__dirname, './input.txt')
  const inputReadStream = fs.createReadStream(inputFilepath)
  const readInterface = readline.createInterface({
    input: inputReadStream,
  })
  return readInterface
}

function parseLine(line) {
  // Regexp is not particularly fast, parsing the string char-by-char would 
  // probably be better on this scenario
  const [_, num1, num2, char, password] = /^([0-9]+?)-([0-9]+?) (.): (.+)$/.exec(line)

  return [num1, num2, char, password]
}

module.exports = {
  createInputFileReadLineInterface,
  parseLine,
}
