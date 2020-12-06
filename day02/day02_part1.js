const { createInputFileReadLineInterface, parseLine } = require('./utils')

function checkPasswordPolicy(passwordPolicy) {
  const [
    minOccurrences,
    maxOccurrences,
    requiredCharacter,
    password,
  ] = passwordPolicy

  let occurrences = 0

  for (const char of password) {
    if (char === requiredCharacter) {
      occurrences += 1
    }

    // Finish early if possible
    if (occurrences > maxOccurrences) {
      return false
    }
  }

  return occurrences >= minOccurrences
}

const input = createInputFileReadLineInterface()
let validPasswordsCount = 0

input.on('line', function(line) {
  const policy = parseLine(line)
  const isValid = checkPasswordPolicy(policy)
  if (isValid) {
    validPasswordsCount += 1
  }
})

input.on('close', () => {
  console.log(`There was ${validPasswordsCount} valid passwords`)
})
