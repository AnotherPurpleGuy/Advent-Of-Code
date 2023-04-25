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

module.exports = { getData }
