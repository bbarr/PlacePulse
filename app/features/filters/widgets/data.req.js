
var $ = require('jquery')
var hub = require('widget').hub
var _ = require('lodash')

var filters = {
  fetch: function() {
    $.get(hub.API_ROOT + '/filters', function(filters) {
      decorate(filters.categories, categoryDecorations)     
      hub.trigger('filtersLoaded', filters)
    })
  }
}

function decorate(cats, decs) {
  cats.forEach(function(cat) {
  	_.extend(cat, (decs[cat.name] || {}))
  })
}

var categoryDecorations = {
  food: {
  	className: 'food',
  	icon: 'fa-cutlery',
  	icon_img: 'https://foursquare.com/img/categories_v2/shops/food_gourmet_64.png',
  },
  services: {
  	className: 'services',
  	icon: 'fa-wrench',
  	icon_img: 'https://foursquare.com/img/categories_v2/shops/hardware_64.png',
  }
}

hub.on('filtersNeeded', filters.fetch)
