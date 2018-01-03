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
