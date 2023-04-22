# Day 1

This folder contain the data set and my solution for day 1 of the advent of code
challenge. My commentary on my solution can be found after the problem.

## The Problems

### Problem 1

Santa's reindeer typically eat regular reindeer food, but they need a lot of
magical energy to deliver presents on Christmas. For that, their favorite snack
is a special type of star fruit that only grows deep in the jungle. The Elves
have brought you on their annual expedition to the grove where the fruit grows.

To supply enough magical energy, the expedition needs to retrieve a minimum of
fifty stars by December 25th. Although the Elves assure you that the grove has
plenty of fruit, you decide to grab any fruit you see along the way, just in
case.

Collect stars by solving puzzles. Two puzzles will be made available on each day
in the Advent calendar; the second puzzle is unlocked when you complete the
first. Each puzzle grants one star. Good luck!

The jungle must be too overgrown and difficult to navigate in vehicles or access
from the air; the Elves' expedition traditionally goes on foot. As your boats
approach land, the Elves begin taking inventory of their supplies. One important
consideration is food - in particular, the number of Calories each Elf is
carrying (your puzzle input).

The Elves take turns writing down the number of Calories contained by the
various meals, snacks, rations, etc. that they've brought with them, one item
per line. Each Elf separates their own inventory from the previous Elf's
inventory (if any) by a blank line.

For example, suppose the Elves finish writing their items' Calories and end up
with the following list:

1000\
2000\
3000

4000

5000\
6000

7000\
8000\
9000

10000

This list represents the Calories of the food carried by five Elves:

The first Elf is carrying food with 1000, 2000, and 3000 Calories, a total of
6000 Calories. The second Elf is carrying one food item with 4000 Calories. The
third Elf is carrying food with 5000 and 6000 Calories, a total of 11000
Calories. The fourth Elf is carrying food with 7000, 8000, and 9000 Calories, a
total of 24000 Calories. The fifth Elf is carrying one food item with 10000
Calories. In case the Elves get hungry and need extra snacks, they need to know
which Elf to ask: they'd like to know how many Calories are being carried by the
Elf carrying the most Calories. In the example above, this is 24000 (carried by
the fourth Elf).

Find the Elf carrying the most Calories. How many total Calories is that Elf
carrying?

### Problem 2

By the time you calculate the answer to the Elves' question, they've already
realized that the Elf carrying the most Calories of food might eventually run
out of snacks.

To avoid this unacceptable situation, the Elves would instead like to know the
total Calories carried by the top three Elves carrying the most Calories. That
way, even if one of those Elves runs out of snacks, they still have two backups.

In the example above, the top three Elves are the fourth Elf (with 24000
Calories), then the third Elf (with 11000 Calories), then the fifth Elf (with
10000 Calories). The sum of the Calories carried by these three elves is 45000.

Find the top three Elves carrying the most Calories. How many Calories are those
Elves carrying in total?

## Commentary

### Layout

Personally I am a big fan of separating code out into smaller functions that are
uses to accomplish a very specific job. I find this to be a much better way of
keeping the main flow of the code simpler to read. It also has the added benefit
of creating reusable function that might be needed later.

For example in the solution above my "main" control flow is as follows

```javascript
const rawData = getData('data.txt')
var sums = processData(rawData)

sums = sortArr(sums)
printAnswer(1, sums)
```

The first two lines are the initialization and processing of our data, the
second too is performing actions on that data to get our desired result. In
theory, you only need to read there 4 lines in order to under stand what the
program dose and roughly how it does it.

This approach also has the added benefit of allowing us to modify any of the
actual logic used with out having to affect the over flow of the program. For
example:

```javascript
function sortArr(arr) {
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

function getDigit(num, i) {
  return Math.floor(Math.abs(num) / Math.pow(10, i)) % 10
}
```

I have decided to use an "off the shelf" radix sort method to sort the array
here however I could easily substitute this for any other sorting method
provided in returns an array of descending values.

### Logic

