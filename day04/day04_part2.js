const {
  createInputFileReadLineInterface,
  createPassportsEventEmitter,
  parsePassport,
  validatePassport,
} = require('./utils')

const fileInputReader = createInputFileReadLineInterface()
const passportStreamReader = createPassportsEventEmitter(fileInputReader)

function validatePassportDay02(passport) {
  return validatePassport(passport, {
    byr: value => Boolean(
      value &&
      value.length === 4 &&
      value >= '1920' &&
      value <= '2002'
    ),
    iyr: value => Boolean(
      value &&
      value.length === 4 &&
      value >= '2010' &&
      value <= '2020'
    ),
    eyr: value => Boolean(
      value &&
      value.length === 4 &&
      value >= '2020' &&
      value <= '2030'
    ),
    hgt: value => {
      if (typeof value !== 'string') {
        return false
      }

      if (value.endsWith('cm')) {
        const v = parseInt(value)
        return v >= 150 && v <= 193
      }
      
      if (value.endsWith('in')) {
        const v = parseInt(value)
        return v >= 59 && v <= 76
      }
      
      return false
    },
    hcl: value => Boolean(value && /^#[0-9a-f]{6}$/.test(value)),
    ecl: value => Boolean(
      value &&
      ({amb:1,blu:1,brn:1,gry:1,grn:1,hzl:1,oth:1})[value]
    ),
    pid: value => Boolean(value && /^[0-9]{9}$/.test(value)),
    cid: _ => true
  })
}

let validPassports = 0

passportStreamReader.on('passport', passport => {
  if (validatePassportDay02(passport)) {
    validPassports += 1
  }
})

passportStreamReader.on('close', () => {
  console.log(`Found ${validPassports} valid passports`)
})
