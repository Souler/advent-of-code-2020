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

module.exports = {
  createInputFileReadLineInterface,
}
