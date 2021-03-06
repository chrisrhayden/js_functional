/* eslint-disable no-console */
const curry = require('lodash/curry')

const add = (x) => (y) => x + y

const add2 = function(x) {
  return function(y) {
    return x + y
  }
}

// increment2 will return only the called function add
const increment2 = add2(2)

const increment = add(1)

const addTen = add(10)

console.log('inc', increment(2))

console.log('add ten', addTen(2))

// call what increment2 will evaluate to
increment2(2)

const test = (() => { let counter = 0; return () => {return counter += 1}})()

for (let i = 0; i < 5; i++) {
  test()
}

console.log('test >', test())


/* curry */

const match = curry((what, str) => str.match(what))

const replace = curry((what, replacement, str) => str.replace(what, replacement))


const filter = curry((f, ary) => ary.filter(f))

const test_obj = {
  match: match(/\s+/g, 'hello world'),
  match_2: match(/\s+/g)('hello world'),
}

console.log(test_obj)

const hasSpaces = match(/\s+/g)
// (x) => x.match(/\s+/g)

const test_obj2 = {
  hasSpaces: hasSpaces('hello world'), // (x) => x.match(/\s+/g)(x)
  hasNoSpace: hasSpaces('no-space'),
  filter_space: filter(hasSpaces, ['tory_spelling', 'tori amos']),
  filter_space2: filter(hasSpaces)(['tory_spelling', 'tori amos'])
}


console.log(test_obj2)

const findSpaces = filter(hasSpaces)

console.log('findSpaces', findSpaces(['tori_spelling', 'tori amos']))

const noVowels = replace(/[aeiouy]/ig)

const censored = noVowels('*')

console.log('censored', censored('ChOcolate Rain'))

/*
const map = curry((f, ary) => ary.map(f))

const getChildren = (x) => x.childNodes

const allTheChildren = map(getChildren)
*/
