const {
  createInputFileReadLineInterface,
  createPassportsEventEmitter,
  validatePassport,
} = require('./utils')

const fileInputReader = createInputFileReadLineInterface()
const passportStreamReader = createPassportsEventEmitter(fileInputReader)

function validatePassportDay01(passport) {
  return validatePassport(passport, {
    cid: _ => true,
  })
}

let validPassports = 0

passportStreamReader.on('passport', passport => {
  if (validatePassportDay01(passport)) {
    validPassports += 1
  }
})

passportStreamReader.on('close', () => {
  console.log(`Found ${validPassports} valid passports`)
})
