const _ = require('ramda')
const accounting = require('accounting')

// eslint-disable-next-line no-console
const print = console.log

const showFunc = (x) => {
  print(x.toString())
}

const trace = (tag, x) => {
  console.log(tag, x)
  return x
}

// Example Data

const lastCar = [
  {
    name: 'Ferrari FF',
    horsepower: 660,
    dollar_value: 700000,
    in_stock: true,
  }
]

const CARS = [
  {
    name: 'Ferrari FF',
    horsepower: 660,
    dollar_value: 700000,
    in_stock: true,
  }, {
    name: 'Spyker C12 Zagato',
    horsepower: 650,
    dollar_value: 648000,
    in_stock: false,
  }, {
    name: 'Jaguar XKR-S',
    horsepower: 550,
    dollar_value: 132000,
    in_stock: false,
  }, {
    name: 'Audi R8',
    horsepower: 525,
    dollar_value: 114200,
    in_stock: false,
  }, {
    name: 'Aston Martin One-77',
    horsepower: 750,
    dollar_value: 1850000,
    in_stock: true,
  }, {
    name: 'Pagani Huayra',
    horsepower: 700,
    dollar_value: 1300000,
    in_stock: false,
  }
]

// Exercise 1:
// ============
// Use _.compose() to rewrite the function below. Hint: _.prop() is curried.
const isLastInStock = function(cars) {
  const last_car = _.last(cars)
  return _.prop('in_stock', last_car)
}

// see link for more
// http://ramdajs.com/docs/#__
const isLIS = _.compose(_.prop('in_stock'), _.last)
showFunc(isLIS)

print(isLIS(CARS))
print(isLIS(lastCar))




// Exercise 2:
// ============
// Use _.compose(), _.prop() and _.head() to retrieve the name of the first car.
const nameOfFirstCar = _.compose(_.prop('name'), _.head)

print('name of 1st car:', nameOfFirstCar(CARS))



// Exercise 3:
// ============
// Use the helper function _average to refactor averageDollarValue as a composition.
const _average = function(xs) {
  return _.reduce(_.add, 0, xs) / xs.length
} // <- leave be

const averageDollarValue = function(cars) {
  const dollar_values = _.map(function(c) {
    return c.dollar_value
  }, cars)
  return _average(dollar_values)
}

print(averageDollarValue(CARS))

const avDV = _.compose(_average, _.map((c) => c.dollar_value))

print(avDV(CARS))


// Exercise 4:
// ============
// Write a function: sanitizeNames() using compose that returns a list of lowercase and underscored car's names: e.g: sanitizeNames([{name: 'Ferrari FF', horsepower: 660, dollar_value: 700000, in_stock: true}]) //=> ['ferrari_ff'].

const _underscore = _.replace(/\W+/g, '_') //<-- leave this alone and use to sanitize


const printSan = _.compose(console.log, _.map((c) => {
  return c.name
}))

// print((() => {
//   CARS.prop('name')
// })())

// i dident read the debuging part well enugh
const sanitizeNames = _.map(_.compose(
  _underscore, _.toLower, _.prop('name')))


print('print >>>>>', sanitizeNames(CARS))

// Bonus 1:
// ============
// Refactor availablePrices with compose.

const availablePrices = function(cars) {
  const available_cars = _.filter(_.prop('in_stock'), cars)
  return available_cars.map(function(x) {
    return accounting.formatMoney(x.dollar_value)
  }).join(', ')
}

print('avp 1', availablePrices(CARS))


const avP = _.compose(_.join(' '),
  _.map((c) => {
    return accounting.formatMoney(c.dollar_value)
  }),
  _.filter(_.prop('in_stock')))

print('avp 2', avP(CARS))


// Bonus 2:
// ============
// Refactor to pointfree. Hint: you can use _.flip().

// const fastestCar = function(cars) {
//   const sorted = _.sortBy(function(car) {
//     return car.horsepower
//   }, cars)
//
//
//   const fastest = _.last(sorted)
//
//   return fastest.name + ' is the fastest'
// }

const append = _.flip(_.concat);
const fastestCar = _.compose(
  append(' is the fastest'),
  _.prop('name'),
  _.last,
  _.sortBy(_.prop('horsepower')));

print(fastestCar(CARS))

const fC = _.compose(
  append(' is the fatests'),
  _.prop('name'),
  _.last,
  _.sortBy(_.prop('horsepower')))


print(fC(CARS))
