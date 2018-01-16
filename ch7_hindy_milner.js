/** whats you type */

//  capitalize :: String -> String
const capitalize = (s) => {
  // sudo code
  return toUpperCase(head(s)) + toLowerCase(tail(s))
}

capaitize('smurf')
// => Smurf


// strLength :: string -> number
const strLength = (s) => {
  return s.length
}

// join :: string -> [string] -> string
const join = curry((what, xs) => {
  return xs.join(what)
})

// match :: regex -> string -> [sring]
// also like
// match :: regex -> (string -> [sring])
const match = curry((reg, s) => {
  return s.match(reg)
})

/**
 * As you can see with the full parenthesis on replace,
 * the extra notation can get a little noisy and redundant so
 * we simply omit them. We can give all the arguments at once if we choose
 * so it's easier to just think of it as: replace takes a Regex,
 * a String, another String and returns you a String.
 *
 * replace :; regex -> string -> string -> string
 * better
 * replace :; regex -> (string -> (string -> string))
 */
const replace = curry((reg, sub, s) => {
  return s.replace(reg, sub)
})

// match :: regex -> (string -> [string])

// onHoliday :: string -> [string]
const onHoliday = match(/holiday/ig)

// id :: a -> a
const id = (x) => {
  return x
}

/**
 * The id function takes any old type a and returns something of the same
 * type a. We're able to use variables in types just like in code.
 * Variable names like a and b are convention, but they are arbitrary
 * and can be replaced with whatever name you'd like. If they are the same
 * variable, they have to be the same type. That's an important rule so let's
 * reiterate: a -> b can be any type a to any type b, but a -> a means it
 * has to be the same type. For example,
 * id may be String -> String or Number -> Number, but not String -> Bool.
 */

// map :: (a -> b) -> [a] -> [b]
const map = curry((f, xs) => {
  return xs.map(f)
})

/**
 * map similarly uses type variables, but this time we introduce b which may or
 * may not be the same type as a. We can read it as:
 * map takes a function from any type a to the same or different type b,
 * then takes an array of a's and results in an array of b's.
 */

// a few more trys
// head :: [a] -> a
const head = (xs) => {
  return xs[0]
}

// filter :: (a -> bool) -> [a] -> [a]
const filter = curry((f, xs) => {
  return xs.filter(f)
})

// reduce :: (b -> a -> b) -> b -> [a] -> b
const reduce = curry((f, x, xs) => {
  return xs.reduce(f, x)
})

/**
 * Ahem, here goes nothing....looking at the signature, we see the first
 * argument is a function that expects a b, an a, and produces a b.
 * Where might it get these as and bs? Well, the following arguments in
 * the signature are a b and an array of as so we can only assume that
 * the b and each of those as will be fed in. We also see that the
 * result of the function is a b so the thinking here is our final incantation
 * of the passed in function will be our output value. Knowing what reduce does,
 * we can state that the above investigation is accurate.
 */

/*
 * head :: [a] -> a

/**
 * Looking at head, we see that it takes [a] to a. Besides the concrete type
 * array, it has no other information available and, therefore, its functionality
 * is limited to working on the array alone. What could it possibly do with the
 * variable a if it knows nothing about it? In other words, a says it cannot be a
 * specific type, which means it can be any type, which leaves us with a function
 * that must work uniformly for every conceivable type. This is what parametricity
 * is all about. Guessing at the implementation, the only reasonable assumptions
 * are that it takes the first, last, or a random element from that array. The
 * name head should tip us off.
 */

// head :: [a] -> a
compose(f, head) == compose(head, map(f))

// filter :: (a -> bool) -> [a] -> [a]
compose(map(f), filter(compose(p, f))) === compose(filter(p), map(f))


// constrants
//
// sort :: Ord a => [a] -> [a] What we see on the left side of our fat arrow
// here is the statement of a fact: a must be an Ord. 
//
// assertEqual :: (Eq a, show a) => a -> a -> Assertion
