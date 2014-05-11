
var hub = require('widget').hub
var $ = require('jquery')

var places = {

  find: function(filters) {
    $.get('http://localhost:3000/places?q[pulseRegion]=orleans.ma', function(places) {
      hub.trigger('placesLoaded', places)
    })
  }
}

hub.on('findPlaces', places.find, places)
