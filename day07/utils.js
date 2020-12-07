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

function parseInputFileLine(line) {
  const [bag, contents] = line.split('contain')
  const bagColor = bag.replace('bags', '')
  const nestedBags = !contents.includes('no other bags')
    ? contents.split(', ').map(bagContents => {
        const [, amount, bag] = /^([0-9]+) (.+?) bags?.?$/.exec(bagContents.trim())
        return {
          bag: bag.trim(),
          amount: Number(amount),
        }
      })
    : []
  
  return {
    bag: bagColor.trim(),
    contents: nestedBags
  }
}

function createLuggageRuleEmitter(readInterface) {
    readInterface.on('line', line => {
      readInterface.emit('bag', parseInputFileLine(line))
  })
  return readInterface;
}

module.exports = {
  createInputFileReadLineInterface,
  parseInputFileLine,
  createLuggageRuleEmitter,
}
