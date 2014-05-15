
var hub = require('widget').hub
var $ = require('jquery')
var Backbone = require('backbone')
var _ = require('lodash')

var Place = Backbone.Model.extend({ })

var places = {

  find: function(filters) {

    var url = 'http://localhost:3000/places?q[region]=orleans.ma'
    if (filters) {
      if (filters.category) {
        url += '&q[category]=' + filters.category.name
      } else if (filters.list) {
        url += '&list=' + filters.list.name
      }
    }

    $.get(url, function(places) {
      var currentPlaces = places.map(function(p, i) { return new Place(_.extend(p, { index: i })) })
      hub.trigger('placesLoaded', currentPlaces)

      hub.on('placeSelected', function(place) {
        currentPlaces.forEach(function(p) {
          p.set('selected', p.cid == place.cid)
        })
      })
    })
  },

  filter: function(obj) {

  }
}

hub.on('findPlaces', places.find, places)
hub.on('filterSelected', places.find, places)
