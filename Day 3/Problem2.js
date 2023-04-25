const { getData } = require('./Common')

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
console.log(dataSet)
