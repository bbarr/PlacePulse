
var asWidget = require('widget')
var rivets = require('rivets')

// injects global L
require('mapbox.js')

module.exports = asWidget('map', function(hub) {

  var map 

  rivets.binders.map = function(el) {
    setTimeout(function() {
      map = L.mapbox.map('map', 'bbarr.map-tvg4iseh', {
        center: [ 41.7898313, -69.9897397 ],
        zoom: 12
      })
    }, 10)
  }

  var widget = this

  widget.on('installed', function() {

    widget
      .template('/boo.html')
      .assets([ 'https://api.tiles.mapbox.com/mapbox.js/v1.6.2/mapbox.css' ], function() {
        widget.start()
      })

    hub.on('placesLoaded', function(places) {
      places
        .filter(function(place) { return place.location.latitude })
        .forEach(function(place) {
          L.marker([ place.location.latitude, place.location.longitude ]).addTo(map)
        })
    })
  })
})

