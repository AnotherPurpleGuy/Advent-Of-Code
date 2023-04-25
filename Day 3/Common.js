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

/**
 * function this function takes a string a returns a map of each charter
 * @param {string} string
 * @returns Map
 */
function generateMap (string) {
  let map = new Map()

  string.split('').forEach((letter) => {
    map = addKey(map, letter)
  })

  return map
}

/**
 * function will take a map, a key. If the key is not already in the map it will
 * add it else it will return the map
 * @param {map} map
 * @param {key} key
 */
function addKey (map, key) {
  if (map.has(key)) {
    return map
  } else {
    map.set(key, 1)
  }
  return map
}

/**
 * function will check in the given map in the key is present and if it is it
 * will return the key
 * @param {map} map
 * @param {string} keyToFind
 * @returns key
 */
function checkForLetterAndRemove (map, keyToFind) {
  for (const key of map.keys()) {
    if (key === keyToFind) {
      map.delete(key)
      return key
    }
  }
  return null // key not found
}

/**
 * function will take a single letter a-Z and return the corresponding integer
 * 1-52
 * @param {string} letter
 * @returns int
 */
function letterToNumber (letter) {
  const asciiCode = letter.charCodeAt(0)
  if (asciiCode > 96) {
    return asciiCode - 96
  } else {
    return asciiCode - 38
  }
}

module.exports = { getData, addKey, checkForLetterAndRemove, letterToNumber, generateMap }
