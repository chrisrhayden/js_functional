/*

const makes = []
for (let i = 0; i < cars.length; i++) {
  makes.push(cars[i].make)
}
const makes = cars.map((car) => car.make)

const authenticat = (form) => {
  cosnt user = toUser(form)
  return logIn(User)
}

const authenticate = compose(logIn, toUser)
*/

// eslint-disable-next-line no-undef
requirejs.config({
  paths: {
    ramda: 'https://cdnjs.cloudflare.com/ajax/libs/ramda/0.13.0/ramda.min',
    jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min'
  }
})

require([ 'ramda', 'jquery' ], (_, $) => {
  //eslint-disable-next-line no-unused-vars
  const trace = _.curry((tag, x) => {
    //eslint-disable-next-line no-console
    console.log(tag, x)
    return x
  })

  const Impure = {
    getJSON: _.curry((callback, url) => {
      $.getJSON(url, callback)
    }),

    setHtml: _.curry((sel, html) => {
      $(sel).html(html)
    })
  }

  const url = (term) => {
    return  'https://api.flickr.com/services/feeds/photos_public.gne?tags=' +
      term + '&format=json&jsoncallback=?'
  }

  const prop = _.curry((property, object) => {
    return object[property]
  })

  const mediaUrl = _.compose(_.prop('m'), _.prop('media'))

  const srcs = _.compose(_.map(mediaUrl), _.prop('items'))

  const img = (url) => {
    return $('<img >', {
      src: url
    })
  }

  const images = _.compose(_.map(img), srcs)
  const renderImages = _.compose(Impure.setHtml('body'), images)
  const app = _.compose(Impure.getJSON(renderImages), url)

  app('cats')
})
