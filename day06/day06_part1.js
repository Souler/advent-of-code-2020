const {
  createInputFileReadLineInterface,
  createGroupAnswersEmitter,
} = require('./utils')

const fileInputReader = createInputFileReadLineInterface()
const groupAnswersEventEmitter = createGroupAnswersEmitter(fileInputReader)

let sum = 0;

groupAnswersEventEmitter.on('group_answers', answers => {
  const uniqQuestions = new Set(answers.flatMap(a => Array.from(a)))
  sum += uniqQuestions.size
})

groupAnswersEventEmitter.on('close', () => {
  console.log(`Sum is: ${sum}`)
})
