const {
  createInputFileReadLineInterface,
  createBoardingPassEventEmitter,
} = require('./utils')

const fileInputReader = createInputFileReadLineInterface()
const boardingPassEventEmitter = createBoardingPassEventEmitter(fileInputReader)

let maxSeatId = -1

boardingPassEventEmitter.on('seat', seat => {
  const [row, column] = seat
  const seatId = row * 8 + column 
  maxSeatId = Math.max(maxSeatId, seatId)
})

boardingPassEventEmitter.on('close', () => {
  console.log(`Max seat id was: ${maxSeatId}`)
})
