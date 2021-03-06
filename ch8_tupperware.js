/**
 * make a contain the holds anythong
 */

/** utils */
const print = console.log


const Container = function(x) {
  this.__value = x
}


// a noe container func
Container.of = (x) => {
  return new Container(x)
}

Container.of(3)
// => Container(3)

//
Container.of('hotdogs')
// => Container('hotdogs')


print(Container.of(Container.of({
  name: 'yoda'
})))
// => Container(Container({ name: 'yoda' }))


/** my first functor */

// (a -> b) -> Container a -> Container b
Container.prototype.map = (f) => {
  return Container.of(f(this.__value))
}

// nether of these wont work
Container.of(2).map((two) => {
  return two + 2
})

// Container.of(2).map(function(two) {
//   return two + 2
// })

Container.of('flamethrowers').map((s) => {
  return s.toUpperCase()
})
//=> Container("FLAMETHROWERS")

Container.of('bombs').map(_.concat('away')).map(_.prop('length'))
//=> Container(10)

/* We can work with our value without ever having to leave the Container. This
 * is a remarkable thing. Our value in the Container is handed to the map function
 * so we can fuss with it and afterward, returned to its Container for safe
 * keeping. As a result of never leaving the Container, we can continue to map
 * away, running functions as we please. We can even change the type as we go
 * along as demonstrated in the latter of the three examples.
 */


/*
 * Wait a minute, if we keep calling map, it appears to be some sort of
 * composition! What mathematical magic is at work here? Well chaps, we've just
 * discovered Functors.
 *
 * A Functor is a type that implements map and obeys some laws
 */

/** schrodingers maybe */

const Maybe = (x) => {
  this.__value = x
}

Maybe.of = function(x) {
  return new Maybe(x)
}

Maybe.prototype.isNothing = () => {
  return (this.__value === null || this.__value === undefined)
}

// test os nothing, if true give nothing, else run the f func
Maybe.prototype.map = (f) => {
  return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value))
}

Maybe.of('Malkovich Malkovich').map(match(/a/ig))
// => Maybe(['a', 'a'])

Maybe.of(null).map(match(/a/ig))
// => null

Maybe.of({
  name: 'Boris'
}).map(_.prop('age')).map(add(10))
// Maybe(null)

Maybe.of({
  name: 'Dinah',
  age: 14
}).map(_.prop('age')).map(add(10))
// => Maybe(24)

// point free
// map :: Functor f => (a -> b) -> f a -> f b
const map = curry((f, any_functor_at_all) => {
  return any_functor_at_all.map(f)
})

/*
 * This is delightful as we can carry on with composition per usual and map will
 * work as expected. This is the case with ramda's map as well. We'll use dot
 * notation when it's instructive and the pointfree version when it's convenient.
 * Did you notice that? I've sneakily introduced extra notation into our type
 * signature. The Functor f => tells us that f must be a Functor. Not that
 * difficult, but I felt I should mention it.
 */
