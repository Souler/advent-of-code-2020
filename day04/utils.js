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

function createPassportsEventEmitter(readInterface) {
  let currentProcessedPassport = ''
  
  readInterface.on('line', line => {
    if (line !== '') {
      currentProcessedPassport += ' ' + line
    } else {
      readInterface.emit('passport', currentProcessedPassport.trim())
      currentProcessedPassport = ''
    }
  })

  readInterface.on('close', () => {
    readInterface.emit('passport', currentProcessedPassport.trim())
  })
  
  return readInterface;
}

function parsePassport(passportStr) {
  return Object.fromEntries(
    passportStr.split(' ')
    .map(passportField => passportField.split(':'))
  )
}

function validatePassport(passportInput, fieldValidations) {
  const passport = typeof passportInput === 'string'
    ? parsePassport(passportInput)
    : passportInput

  const fieldValidation = {
    byr: value => Boolean(value),
    iyr: value => Boolean(value),
    eyr: value => Boolean(value),
    hgt: value => Boolean(value),
    hcl: value => Boolean(value),
    ecl: value => Boolean(value),
    pid: value => Boolean(value),
    cid: value => Boolean(value),
    ...fieldValidations,
  }

  return Object.entries(fieldValidation).every(
    ([field, validation]) => validation(passport[field]),
  )
}

module.exports = {
  createInputFileReadLineInterface,
  createPassportsEventEmitter,
  parsePassport,
  validatePassport,
}
