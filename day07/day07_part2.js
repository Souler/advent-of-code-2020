const {
  createInputFileReadLineInterface,
  createLuggageRuleEmitter
} = require('./utils')

const fileInputReader = createInputFileReadLineInterface()
const bagEmitter = createLuggageRuleEmitter(fileInputReader)

const bagEntries = new Map()

function calcNestedBagAmount(bagColor) {
  const bagContents = bagEntries.get(bagColor)
  return bagContents.reduce((total, nestedBag) =>
    total + nestedBag.amount + nestedBag.amount * calcNestedBagAmount(nestedBag.bag),
    0,
  )
}

bagEmitter.on('bag', bagDescription => {
  bagEntries.set(bagDescription.bag, bagDescription.contents)
})

bagEmitter.on('close', () => {
  const nestedCount = calcNestedBagAmount('shiny gold')
  console.log(`You need ${nestedCount} nested bags inside your shiny gold bag!`)
})
