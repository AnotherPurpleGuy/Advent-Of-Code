const { Worker, isMainThread, parentPort, workerData } = require('worker_threads')
const fs = require('fs')
const { exit } = require('process')

/**
 * function will take a filename as a string as an argument and try and open it
 * as a 'utf-8' document. If there is an issue opening or reading the file the
 * error will be printed via 'console.error()' and the program will exit.
 * @param {string} filename
 * @returns contents of file as a string
 */
function getData (filename) {
  try {
    const data = fs.readFileSync(filename, 'utf-8')
    return data
  } catch (err) {
    console.error('Error reading the file : ' + err.message)
    exit()
  }
}

function convertLetter (letter) {
  if (letter === 'A' || letter === 'X') return 0
  if (letter === 'B' || letter === 'Y') return 1
  if (letter === 'C' || letter === 'Z') return 2
}

function makeDataArray (inputString) {
  const dataArray = inputString.split('\r\n').map((element) => {
    const game = element.split(' ').map((letter) => convertLetter(letter))
    return game
  })

  return dataArray
}

function makeLookUpTable (inputString) {
  const arr = inputString.split('\r\n').map((element) => {
    return element.split(',').map((num) => parseInt(num))
  })
  return arr
}

if (isMainThread) {
  const gameDataArray = makeDataArray(getData('data.txt'))
  const gameValues = makeLookUpTable(getData('problem-1-lookup-table.txt'))

  // Split the array into 4 parts for the workers
  const chunkSize = Math.ceil(gameDataArray.length / 4)
  const chunks = Array.from({ length: 4 }, (_, i) => gameDataArray.slice(i * chunkSize, (i + 1) * chunkSize))

  // Create the workers and pass the chunks as workerData
  const workers = chunks.map((chunk) => {
    const workerData = {
      workerChunk: chunk,
      lookUpTable: gameValues
    }

    return new Worker(__filename, { workerData })
  })

  // Initialize the results array
  const results = Array.from({ length: 4 }, () => null)

  // Listen for messages from the workers and aggregate the results
  workers.forEach((worker, i) => {
    worker.on('message', (result) => {
      results[i] = result
      const done = results.every((result) => result !== null)
      if (done) {
        const finalResult = results.reduce((acc, result) => acc + result, 0)
        console.log(`Final result: ${finalResult}`)
      }
    })
  })
} else {
  // Get our data out of the passed object and initialize our sum var
  const workerChunk = workerData.workerChunk
  const lookUpTable = workerData.lookUpTable

  let sum = 0

  // Loop until there are no more elements in the array
  while (workerChunk.length > 0) {
    // Pop an element from the array and perform the split, lookup, and sum
    const game = workerChunk.pop()
    const gameValue = lookUpTable[game[0]][game[1]]
    sum = gameValue + sum
  }

  // Send the result back to the main thread
  parentPort.postMessage(sum)
}
