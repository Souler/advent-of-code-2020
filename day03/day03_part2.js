const {
  parseInputFile,
  readInputFile,
  readMapPosition,
} = require('./utils')

const input = readInputFile()
const map = parseInputFile(input)

function travelSlope(stepX, stepY) {
  let treeCount = 0

  for (let x = 0, y = 0; y < map.length; x += stepX, y += stepY) {
    const elem = readMapPosition(map, x, y)
  
    if (elem === '#') {
      treeCount += 1
    }
  }

  return treeCount
}

const traverseSteps = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
]

const result = traverseSteps
  .map(([stepX, stepY]) => {
    const treeCount = travelSlope(stepX, stepY)
    console.log(`While traversing right ${stepX} down ${stepY}, found ${treeCount} trees`)
    return treeCount
  })
  .reduce((v, c) => v * c, 1)

console.log(`Result is: ${result}`)
