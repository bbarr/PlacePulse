
var $ = require('jquery')
var hub = require('widget').hub
var _ = require('lodash')

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
    }).error(function() {
      hub.trigger('myToursLoaded', [])
    })
  },

  save: function(tour, cb) {
    var raw = tour.attributes
    raw.places = raw.places.map(function(p) { return p.attributes })
    var isNew = !raw._id

    delete raw.mine

    if (!raw.name) {
      return hub.trigger('tourSaveFailed')
    }

    $.ajax({
      url: hub.API_ROOT + '/tours' + (isNew ? '' : ('/' + raw._id)),
      type: isNew ? 'POST' : 'PUT',
      contentType: 'application/json',
      data: JSON.stringify(raw), 
      success: function(saved) {
        hub.trigger('tourSaved', isNew ? saved : raw)
        if (cb) cb()
      },
      error: function() {
        hub.trigger('tourSaveFailed')
      }
    })
  },

  destroy: function(tour, cb) {
    $.ajax({
      url: hub.API_ROOT + '/tours/' + tour.get('_id'),
      type: 'DELETE',
      success: function() {
        hub.trigger('tourDestroyed', tour)
        if (cb) cb()
      }
    })
  }
}

hub.on('toursNeeded', tours.fetch, tours)
hub.on('myToursNeeded', tours.fetchMine, tours)
hub.on('saveTour', tours.save, tours)
hub.on('destroyTour', tours.destroy, tours)

hub.on('authenticationChanged', function() {
  hub.trigger('filtersNeeded')
  hub.once('filtersLoaded', function() {
    hub.trigger('myToursNeeded')
  })
})
