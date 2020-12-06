const {
  createInputFileReadLineInterface,
  createBoardingPassEventEmitter,
} = require('./utils')

const fileInputReader = createInputFileReadLineInterface()
const boardingPassEventEmitter = createBoardingPassEventEmitter(fileInputReader)

const seatIds = new Set()
const mySeatCandidates = new Set()

boardingPassEventEmitter.on('seat', seat => {
  const [row, column] = seat
  const seatId = row * 8 + column 

  seatIds.add(seatId)

  if (seatIds.has(seatId + 2)) {
    mySeatCandidates.add(seatId + 1)
  } else if (seatIds.has(seatId - 2)) {
    mySeatCandidates.add(seatId - 1)
  }
})

boardingPassEventEmitter.on('close', _ => {
  for (const seatId of mySeatCandidates) {
    if (!seatIds.has(seatId)) {
      console.log(`Your seat id is ${seatId}`)
    }
  }
})
