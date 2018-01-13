/* eslint-disable no-console, no-unused-vars */
/* my utils */

const R = require('ramda')

const print = console.log

/** the main ataction
 * make a function that takes two
 * other functions and a var
 *
 * we can then call it with only the two functs
 * missing the var
 *
 * this one can only take two funcs, it woulkd be cool
 * to make on that can take any amount
 */
const compose = (f, g) => {
  return (x) => {
    return (f(g(x)))
  }
}


const toUpperCase = (x) => {
  return x.toUpperCase()
}

const exclaim = (x) => {
  return x + '!'
}

/* using the compose func */
const shout = compose(exclaim, toUpperCase)

print(shout('send in the clowns'))

// i guess this is batter as no implyed vars
// eslint-disable-next-line no-unused-vars
const shoutReadable = (x) => {
  return exclaim(toUpperCase(x))
}

const head = (x) => {
  return x[0]
}

const reverse = R.reduce((acc, x) => {
  return [x].concat(acc)
}, [])

const last = compose(head, reverse)

print(last(['jumpkick', 'roundhouse', 'uppercut']))

// ac
const loudLastUpper = compose(exclaim, toUpperCase, head, reverse)

// or
const loudLastUpper2 = compose(exclaim, toUpperCase, last)

// or
const angry = compose(head, reverse)

const loudLastUpper3 = compose(angry, last)

/*
 * Pointfree style means never having to say your data.
 * Excuse me. It means functions that never mention the data upon
 * which they operate. First class functions, currying,
 * and composition all play well together to create this style.
 */

// not ponitfree because we mention the data
const snakeCase = (word) => {
  return word.toLowerCase().replace(/\s+/ig, '_')
}

const toLowerCase = (x) => x.toLowerCase()

// pointfree as no data
const snakeCaseBetter = compose(R.replace(/\s+/ig, '_'), toLowerCase)

print(snakeCaseBetter('what did you say'))

// pointfull
const initials = (name) => {
  return name.split(' ').map(compose(toUpperCase, head).join('. '))
}

// pointfree

const arrrs = [1, 2, 3, 4, 5]
const letArr = 'hunter stocktion thompson'


const fake = (x) => {
  const splitX = x.split(' ')

  splitX.map((x) => {
    const hh = head(x)
    const uh = toUpperCase(x)
    print(uh)
  })
}

fake(letArr)

// TODO make real
const initialsBetter = compose(
  R.join('. '), R.map(compose(toUpperCase, head)), R.split(' '))

print(initialsBetter('hunter stocktion thompson'))

// forgeting to call map
// const latinBad = compose(map, angry, reverse)

const latin = compose(R.map(angry), reverse)

// latin(['frog', 'eyes'])
// ['EYES!', 'FROG']

const trace = R.curry((tag, x) => {
  console.log(tag, x)

  return x
})

// my compos can only take two funcs,
// dasherize calls 4
// const dasherize = compose(
//R.join('-'), R.map(R.toLower), R.split(' '), R.replace(/\s{2,}/ig, ' '))

var dasherize = R.compose(
  R.join('-'), R.map(R.toLower),
  trace('after split'), R.split(' '), R.replace(/\s{2,}/ig, ' '))

print(dasherize('The world is a vampire'))

// morph
const g = (x) => {
  return x.length
}

const f = (x) => x === 4

const isFourLetterWord = compose(f, g)

print('isForlett', isFourLetterWord('word'))

// A distinguished morphism called identity
const id = (x) => {
  return x
}

// identity
// print('id', compose(f, id)(4), compose(id, f)(4))
print(compose(f, id) == compose(id, f))

// cant get to work
// identity
// compose(id, f) == compose(f, id) == f;
// true
