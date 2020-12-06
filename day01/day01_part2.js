const { createInputFileReadLineInterface } = require('./utils')

const inputStream = createInputFileReadLineInterface()

function buildValuesTree(value) {
  const result = new Map()
  for (let i = 0; i + value < 2020; i++) {
    result.set(i, 2020 - (i + value))
  }
  return result
}

const values = new Map()

inputStream.on('line', function(line) {
  const n = Number(line)
  const tree = buildValuesTree(n)

  for (const [op1, op2] of tree) {
    if (values.has(op1) && values.has(op2) && values.get(op1).has(n)) {
      console.log(`${n} + ${op1} + ${op2} = ${n + op1 + op2}`)
      console.log(`${n} * ${op1} * ${op2} = ${n * op1 * op2}`)
      inputStream.close()
      process.exit(0)
    }
  }

  values.set(n, tree)
})
