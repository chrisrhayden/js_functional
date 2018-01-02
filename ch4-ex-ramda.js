/* eslint-disable no-console */
const _ = require('ramda')

// Exercise 1
//==============
// Refactor to remove all arguments by partially applying the function.

var words = function(str) {
  return _.split(' ', str)
}

console.log('old', words('word list by space'))

/* wroing
const cWords = str => _.split(' ', str)
 *
 * I guess split will be curried also
*/

const cWords = _.split(' ')

console.log('new', cWords('word list by space'))

// Exercise 1a
//==============
// Use map to make a new words fn that works on an array of strings.
//

const test_sentences = ['a soon to be word list', 'another word list in the making']

/* wrong
const Bsentences = array => array.map(cWords)
*/
const sentences = _.map(cWords)


console.log(sentences(test_sentences))


// Exercise 2
//==============
// Refactor to remove all arguments by partially applying the functions.


const match = (what, str) => str.match(what)

var filterQs = function(xs) {
  return _.filter(function(x) {
    return match(/q/i, x)
  }, xs)
}

// const matchQ = (x) => match(/q/i, x)

const newFilterQs = _.filter((str) => str.match(/q/i))

console.log('old filterQs one q', filterQs('i am a q'))

console.log('new filterQs tow qs', newFilterQs('i am a q with another q'))


// Exercise 3
//==============
// Use the helper function _keepHighest to refactor max to not reference any
// arguments.

// LEAVE BE:
var _keepHighest = function(x, y) {
  return x >= y ? x : y
}

// REFACTOR THIS ONE:
var max = function(xs) {
  return _.reduce(function(acc, x) {
    return _keepHighest(acc, x)
  }, -Infinity, xs)
}

console.log('old max', max([17, 20]))

const newMax = _.reduce(_keepHighest, -Infinity)

console.log('new max', newMax([17, 20]))


// Bonus 1:
// ============
// Wrap array's slice to be functional and curried.
// //[1, 2, 3].slice(0, 2)
var Oldslice = [1, 2, 3].slice(0, 2)

console.log('old slice', Oldslice)

const slice = _.curry((x, y, ary) => ary.slice(x, y))


// Bonus 2:
// ============
// Use slice to define a function "take" that returns n elements from the beginning of an array. Make it curried.
// For ['a', 'b', 'c'] with n=2 it should return ['a', 'b'].

/*  wrong
const take = (n, arry) => arry.slice(0, n)
*/

const take = slice(0)

/* works */
const take2 = ary => take(2, ary)

console.log('take2', take2(['a', 'b', 'c']))

/* needs the arg specified i guess */
const take2_better = take(2, _)

console.log('take2 better', take2_better(['a', 'b', 'c']))

/** wont work
  * it broke due to the wrong take */
const take2_Broke = take(2)

console.log('take2 best', take2_Broke(['a', 'b', 'c']))
