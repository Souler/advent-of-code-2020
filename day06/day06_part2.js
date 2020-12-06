const {
  createInputFileReadLineInterface,
  createGroupAnswersEmitter,
} = require('./utils')

function countLetters(letters) {
  return letters.reduce((acc, letter) => {
    if (acc.has(letter)) {
      acc.set(letter, acc.get(letter) + 1)
    } else {
      acc.set(letter, 1)
    }
    return acc
  }, new Map())
}

const fileInputReader = createInputFileReadLineInterface()
const groupAnswersEventEmitter = createGroupAnswersEmitter(fileInputReader)

let sum = 0;

groupAnswersEventEmitter.on('group_answers', answers => {
  const answersMap = countLetters(answers.flatMap(a => Array.from(a)))

  for (const [letter, count] of answersMap) {
    if (count === answers.length) {
      sum += 1
    }
  }
})

groupAnswersEventEmitter.on('close', () => {
  console.log(`Sum is: ${sum}`)
})
