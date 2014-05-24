
var $ = require('jquery')
var hub = require('widget').hub

var tours = {

  fetch: function() {
    $.get(hub.API_ROOT + '/tours', function(tours) {
      hub.trigger('toursLoaded', tours)
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

hub.on('loadTours', tours.fetch, tours)
hub.on('loadMyTours', tours.fetchMine, tours)
hub.on('saveTours', tours.save, tours)
hub.on('destroyTour', tours.destroy, tours)
