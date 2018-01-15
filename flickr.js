requirejs.config({
  paths: {
    ramda:
    'https://cdnjs.cloudflare.com/ajax/'
    + 'libs/ramda/0.13.0/ramda.min',
    jquery:
    'https://ajax.googleapis.com/ajax/'
    + 'libs/jquery/2.1.1/jquery.min'
  }
})

require(['ramda', 'jquery'], (_, $) => {
  const trace = _.curry((tag, x) => {
    console.log(tag, x)
    return x
  })

  const Impure = {
    getJSON: _.curry((callback, url) => {
      $.getJSON(url, callback)
    }),
    setHTML: _.curry((sel, html) => {
      $(sel).html(html)
    })
  }

  const url = (term) => {
    return (
      'https://api.flickr.com/services'
      + '/feeds/photos_public.gne?tags='
      + term + '&format=json&jsoncallback=?'
    )
  }

  const img = (url) => {
    return $('<img >', {
      src: url
    })
  }

  const mediaUrl = _.compose(_.prop('m'), _.prop('media'))

  const mediaToImg = _.compose(img, mediaUrl)

  const images = _.compose(_.map(mediaToImg), trace('after items'), _.prop('items'))

  const setImgs = _.compose(Impure.setHTML('body'), images)

  const app = _.compose(Impure.getJSON(setImgs), url)

  app('cats')
})
