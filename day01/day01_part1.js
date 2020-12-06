const { createInputFileReadLineInterface } = require('./utils')

const inputStream = createInputFileReadLineInterface()
const values = new Set()

inputStream.on('line', function(line) {
  const n = Number(line)
  const diff = 2020 - n

  if (values.has(diff)) {
    console.log(`${n} + ${diff} = ${n + diff}`)
    console.log(`${n} * ${diff} = ${n * diff}`)
    inputStream.close()
    process.exit(0)
  } else {
    values.add(n)
  }
})
