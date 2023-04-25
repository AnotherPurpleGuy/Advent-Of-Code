const { getData } = require('./Common')

/**
 * function will take one long string containing the input and split it by line.
 * The for each line it will split it half and return an array of 2D arrays
 * containing the first and second half of that line
 * @param {string} input 
 * @returns array
 */
function probOneParcer (input) {
  const arr = input.split('\r\n').map((element) => {
    const elementLen = element.length

    const firstHalf = element.slice(0, elementLen / 2)
    const secondHalf = element.slice(elementLen / 2, elementLen)

    return [firstHalf, secondHalf]
  })

  return arr
}
