const add = (flock_x, flock_y) => flock_x + flock_y

const multiply = (flock_x, flock_y) =>  flock_x * flock_y

let flock_a = 4

let flock_b = 2

// let flock_c = 0

/*
const result = add(
  multiply(flock_b, add(flock_a, flock_c)), multiply(flock_a, flock_b)
)
*/


// Apply the identity property to remove the extra add
// (add(flock_a, flock_c) == flock_a)
// const result = add(multiply(flock_b, flock_a), multiply(flock_a, flock_b))

const result = multiply(flock_b, add(flock_a, flock_a))

// eslint-disable-next-line no-console
console.log(result)
