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
  const columnStr =  line.substring(0, 7)
  const rowStr = line.substring(7)
  const column = parseInt(
    Array.from(columnStr)
      .map(c => Number(Boolean(c === 'B')))
      .join(''),
    2,
  )
  const row = parseInt(
    Array.from(rowStr)
      .map(c => Number(Boolean(c === 'B')))
      .join(''),
    2,
  )

  return [column, row]
}

function createBoardingPassEventEmitter(readInterface) {  
  readInterface.on('line', line => {
    readInterface.emit('seat', parseLine(line))
  })
  
  return readInterface;
}

module.exports = {
  createInputFileReadLineInterface,
  createBoardingPassEventEmitter,
}
