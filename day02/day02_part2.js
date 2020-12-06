const { createInputFileReadLineInterface, parseLine } = require('./utils')

function checkPasswordPolicy(passwordPolicy) {
  const [
    pos1,
    pos2,
    requiredCharacter,
    password,
  ] = passwordPolicy

  const idx1 = pos1 - 1
  const idx2 = pos2 - 1

  return (
    password.charAt(idx1) === requiredCharacter && 
    password.charAt(idx2) !== requiredCharacter
  ) || (
    password.charAt(idx2) === requiredCharacter &&
    password.charAt(idx1) !== requiredCharacter
  )
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
