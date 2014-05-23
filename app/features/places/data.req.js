
var hub = require('widget').hub
var $ = require('jquery')
var Backbone = require('backbone')
var _ = require('lodash')

var Place = Backbone.Model.extend({ })

var places = {

  current: [],

  save: function(place) {
    hub.trigger('placeSaved')
  },

  find: function(filters) {

    var url = hub.API_ROOT + '/places?q[region]=orleans.ma'
    if (filters) {
      if (filters.category) {
        url += '&q[category]=' + filters.category.name
      } else if (filters.list) {
        url += '&list=' + filters.list.name
      }
    } else return

    url += '&perPage=50'
    url += '&page=1'

    var _places = []
    function fetch(i) {
      $.get(url.replace(/page=\d+/, 'page=' + i), function(ps) {
        _places = _places.concat(ps)
        console.log(ps.length)
        if (ps.length === 50) fetch(i + 1)
        else {
          places.current = _places.map(function(p, i) { return new Place(_.extend(p, { index: i })) })
          hub.trigger('placesLoaded', places.current)
        }
      })
    }

    return fetch(1)
    
    $.get(url, function(places) {
      places.current = places.map(function(p, i) { return new Place(_.extend(p, { index: i })) })
      hub.trigger('placesLoaded', places.current)
    })
  },

  filter: function(obj) {

  }
}

hub.on('placeSelected', function(place) {
  if (!places.current) return
  places.current.forEach(function(p) {
    p.set('selected', p.cid == place.cid)
  })
})

hub.on('findPlaces', places.find, places)
hub.on('filterSelected', places.find, places)
hub.on('savePlace', places.save, places)
