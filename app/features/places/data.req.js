
var hub = require('widget').hub
var $ = require('jquery')
var Backbone = require('backbone')
var _ = require('lodash')

var Place = Backbone.Model.extend({ })

function decorateCategory(place) {
  hub.trigger('getCategoryForPlace', place, place.set.bind(place, 'category'))
  return place
}

var places = {

  current: [],

  save: function(place) {

    var isNew = !place._id
    var url = hub.API_ROOT + '/places'
    if (!isNew) url += '/' + place._id

    $.ajax({
      url: url,
      type: (isNew ? 'POST' : 'PUT'),
      contentType: 'application/json',
      data: JSON.stringify(place), 
      success: function() {
        hub.trigger('placeSaved')
      }
    })
  },

  find: function(filters) {

    var url = hub.API_ROOT + '/places?q[region]=orleans.ma'
    if (filters) {
      if (filters.category) {
        url += '&q[category]=' + filters.category.name + '&q[categoryRange]=' + filters.category.factualIds.join(',')
      } else if (filters.tour) {
        url += '&tour=' + filters.tour.name
      }
    } else return

    hub.trigger('placesLoaded', [])
    hub.trigger('placesLoading')

    url += '&perPage=50'
    url += '&page=1'

    var _places = []
    function fetch(i) {
      $.get(url.replace(/page=\d+/, 'page=' + i), function(ps) {
        _places = _places.concat(ps)
        if (ps.length === 50) fetch(i + 1)
        else {
          places.current = _places.map(function(p, i) { return new Place(_.extend(p, { index: i })) })
          hub.trigger('placesLoaded', places.current.map(decorateCategory).filter(function(p) { return p.get('category') && p.get('location') }))
        }
      })
    }

    return fetch(1)
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
