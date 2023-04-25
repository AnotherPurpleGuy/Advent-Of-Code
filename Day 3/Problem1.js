const { getData, addKey, checkForLetterAndRemove, letterToNumber } = require('./Common')

/**
 * function will take one long string containing the input and split it by line.
 * The for each line it will split it half and return an array of 2D arrays
 * containing the first and second half of that line
 * @param {string} input
 * @returns array
 */
function probOneParser (input) {
  const arr = input.split('\r\n').map((element) => {
    const elementLen = element.length

    const firstHalf = element.slice(0, elementLen / 2)
    const secondHalf = element.slice(elementLen / 2, elementLen)

    return [firstHalf, secondHalf]
  })

  return arr
}

const dataSet = probOneParser(getData('data.txt'))
let result = 0

dataSet.forEach((element) => {
  let map = new Map()

  element[0].split('').forEach((letter) => {
    map = addKey(map, letter)
  })

  element[1].split('').forEach((letter) => {
    const match = checkForLetterAndRemove(map, letter)
    if (match) {
      result += letterToNumber(match)
    }
  })
})

console.log(result)
