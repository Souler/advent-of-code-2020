function readInputFile() {
  const fs = require('fs')
  const path = require('path')
  const inputContents = fs.readFileSync(
    path.resolve(__dirname, './input.txt'),
    'ascii',
  )
  return inputContents
}

function parseInputFile(inputContents) {
  const map = []
  let rowIndex = 0

  for (const char of inputContents) {
    if (map[rowIndex] === undefined) {
      map[rowIndex] = []
    }

    if (char === '.' || char === '#') {
      map[rowIndex].push(char)
    } else if (map[rowIndex].length > 0) {
      rowIndex++
    }
  }

  return map
}

function readMapPosition(map, x, y) {
  const mapWidth = map[0].length
  return map[y][x % mapWidth]
}

module.exports = {
  readInputFile,
  parseInputFile,
  readMapPosition,
}
