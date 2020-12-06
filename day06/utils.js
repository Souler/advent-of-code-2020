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

function createGroupAnswersEmitter(readInterface) {
  let currentGroupAnswers = []
  
  readInterface.on('line', line => {
    if (line !== '') {
      currentGroupAnswers.push(line)
    } else {
      readInterface.emit('group_answers', currentGroupAnswers)
      currentGroupAnswers = []
    }
  })

  readInterface.on('close', () => {
    readInterface.emit('group_answers', currentGroupAnswers)
  })
  
  return readInterface;
}

module.exports = {
  createInputFileReadLineInterface,
  createGroupAnswersEmitter,
}
