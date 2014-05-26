
var $ = require('jquery')
var hub = require('widget').hub

var tours = {

  details: function(name, cb) {
    $.get(hub.API_ROOT + '/tours/' + name, function(tour) {
      hub.trigger('tourLoaded', tour)
      if (cb) cb(tour)
    })
  },

  fetchMine: function() {
    $.get(hub.API_ROOT + '/tours/mine', function(tours) {
      hub.trigger('myToursLoaded', tours)
    })
  },

  save: function(tour, cb) {
    var raw = tour.attributes
    raw.places = raw.places.map(function(p) { return p.attributes })
    var isNew = !raw._id
    $.ajax({
      url: hub.API_ROOT + '/tours' + (isNew ? '' : ('/' + raw._id)),
      type: isNew ? 'POST' : 'PUT',
      contentType: 'application/json',
      data: JSON.stringify(raw), 
      success: function() {
        hub.trigger('tourCreated')
        if (cb) cb()
      }
    })
  },

  destroy: function(tour, cb) {
    $.ajax({
      url: hub.API_ROOT + '/tours/' + tour.get('_id'),
      type: 'DELETE',
      success: function() {
        hub.trigger('tourDestroyed')
        if (cb) cb()
      }
    })
  }
}

hub.on('toursNeeded', tours.fetch, tours)
hub.on('myToursNeeded', tours.fetchMine, tours)
hub.on('saveTours', tours.save, tours)
hub.on('destroyTour', tours.destroy, tours)
