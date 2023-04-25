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
 * function will take a map, a key. If the key is already in the map it will
 * increment the value by 1 in not in will make a new key in the map with the
 * value being set to 1
 * @param {map} map
 * @param {key} key
 */
function addOrUpdateKey (map, key) {
  if (map.has(key)) {
    map.set(key, map.get(key) + 1)
  } else {
    map.set(key, 1)
  }
}

module.exports = { getData, addOrUpdateKey }