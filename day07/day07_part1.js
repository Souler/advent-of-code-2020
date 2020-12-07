const {
  createInputFileReadLineInterface,
  createLuggageRuleEmitter
} = require('./utils')

const fileInputReader = createInputFileReadLineInterface()
const bagEmitter = createLuggageRuleEmitter(fileInputReader)

function buildChildParentMapping(bagEntries) {
  const childParentMapping = new Map()
  for (const [parentBag, contents] of bagEntries) {
    for (const { bag: childBag, amount } of contents) {
      if (childParentMapping.has(childBag)) {
        childParentMapping.get(childBag).push({ bag: parentBag, amount })
      } else {
        childParentMapping.set(childBag, [{ bag: parentBag, amount }])
      }
    }
  }

  return childParentMapping
}

function findBagParents(childParentMapping, bag) {
  return (childParentMapping.get(bag) ?? []).flatMap(parentBag => {
    return [
      parentBag,
      ...findBagParents(childParentMapping, parentBag.bag)
    ]
  })
}

const bagEntries = new Map()

bagEmitter.on('bag', bagDescription => {
  bagEntries.set(bagDescription.bag, bagDescription.contents)
})

bagEmitter.on('close', () => {
  const childParentMapping = buildChildParentMapping(bagEntries)
  const bagParents = findBagParents(childParentMapping, 'shiny gold')
  const uniqBagParentsColor = new Set(bagParents.map(b => b.bag))
  console.log(`${uniqBagParentsColor.size} colors can contain a shiny gold bag`)
})
