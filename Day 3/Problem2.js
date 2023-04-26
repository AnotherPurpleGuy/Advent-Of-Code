const { getData, generateMap, checkForLetterAndRemove, letterToNumber } = require('./Common')

function probTwoParser (input) {
  const splitArr = input.split('\r\n')
  const redArr = splitArr.reduce((obj, string) => {
    if (obj.tmp.length < 3) {
      obj.tmp.push(string)
      return obj
    } else {
      obj.result.push(obj.tmp)
      obj.tmp = []
      return obj
    }
  }, { result: [], tmp: [] })
  return redArr.result
}

const dataSet = probTwoParser(getData('data.txt'))
let result = 0

dataSet.forEach(element => {
  const map1 = generateMap(element[0])
  const map2 = generateMap(element[1])

  element[2].split('').forEach((letter) => {
    const checkOne = checkForLetterAndRemove(map1, letter)
    if (checkOne) {
      const checkTwo = checkForLetterAndRemove(map2, checkOne)
      if (checkTwo) {
        result += letterToNumber(checkTwo)
      }
    }
  })
})

console.log(result)
