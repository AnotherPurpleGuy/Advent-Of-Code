const fs = require('fs')
const { exit } = require('process')

/*
    This radixSort function will take and array of numbers and return it in descending
    order
*/
function sortArr (arr) {
  const maxNum = Math.max(...arr)
  const maxNumDigits = Math.floor(Math.log10(maxNum)) + 1

  let sortedArr = [...arr]
  for (let i = 0; i < maxNumDigits; i++) {
    const buckets = Array.from({ length: 10 }, () => [])
    for (let j = 0; j < sortedArr.length; j++) {
      const digit = getDigit(sortedArr[j], i)
      buckets[9 - digit].push(sortedArr[j])
    }
    sortedArr = [].concat(...buckets)
  }
  return sortedArr
}

function getDigit (num, i) {
  return Math.floor(Math.abs(num) / Math.pow(10, i)) % 10
}

/*
    This function will take the data array split it into each elf and then sum
    the amount of calories each elf has. Once finished it will return an array of
    all the summed values.
*/
function processData (data) {
  const dataArray = data.split('\r\n\r\n').map((element) => {
    const subArray = element.split('\n')
    const sum = subArray.reduce((acc, num) => acc + parseInt(num), 0)

    return sum
  })

  return dataArray
}

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

/*
    This function will print the desired answer to the console.
    the numberOfElves variable indicated how many of the elves with
    the most calories we want to know the answer too. The orderedList
    is the ordered sum of all the elves
*/
function printAnswer (numberOfElves, orderedList) {
  const tmp = orderedList.slice(0, numberOfElves)
  const total = tmp.reduce((acc, num) => {
    return acc + num
  }, 0)

  console.log('Total calories for the top ' + numberOfElves + ' elves is : ' + tmp)
  console.log('Sum of all these calories : ' + total)
}

// Entry point

const rawData = getData('data.txt')
let sums = processData(rawData)

sums = sortArr(sums)
printAnswer(1, sums)
