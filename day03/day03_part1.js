const {
  parseInputFile,
  readInputFile,
  readMapPosition,
} = require('./utils')

const input = readInputFile()
const map = parseInputFile(input)

let treeCount = 0

for (let x = 0, y = 0; y < map.length; x += 3, y += 1) {
  const elem = readMapPosition(map, x, y)

  if (elem === '#') {
    treeCount += 1
  }
}

console.log(`Found ${treeCount} trees`)
