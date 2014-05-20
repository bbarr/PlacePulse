
var asWidget = require('widget')
var rivets = require('rivets')
var _ = require('lodash')

// injects global L
require('mapbox.js')

module.exports = asWidget('map', function(hub) {
  var widget = this

  rivets.binders.map = function(el) {
    widget.set('map', L.mapbox.map('map', 'bbarr.map-tvg4iseh', {
      center: [ 41.7898313, -69.9897397 ],
      zoom: 16,
      minZoom: 15,
      maxZoom: 17
    }))
  }

  function buildMarker(place) {
    return L.marker(
      [ place.get('location').latitude, place.get('location').longitude ], 
      { icon: L.divIcon({ html: place.get('index') }) }
    )
  }

  function buildLatLng(place) {
    return [ place.get('location').latitude, place.get('location').longitude ]
  }

  function findMarker(place) {
    return _.find(widget.get('markers'), function(m) { 
      return m.place.cid == place.cid 
    })
  }

  function hasLatLng(place) {
    return buildLatLng(place)[0]
  }

  function publishPinClicked(e) {
    hub.trigger('placeSelected', e.target.place)
  }

  hub.on('placeSelected', function(place) {
    var marker = findMarker(place)
    marker.bindPopup(place.get('name')).openPopup()
    widget.get('map').setView(buildLatLng(place))
  })

  widget.on('installed', function() {

    widget.on('change:map', function() {
      var markerLayer = L.layerGroup()
      markerLayer.addTo(widget.get('map'))
      widget.set('markerLayer', markerLayer)
    })

    widget
      .template('/boo.html')
      .assets([ 'https://api.tiles.mapbox.com/mapbox.js/v1.6.2/mapbox.css' ], function() {

        // have to show map here before bindings so mapbox works right
        widget.set('visible', true)

        widget.start()
      })

    hub.on('placesLoaded', function(places) {
      widget.get('markerLayer').clearLayers()
      widget.set('places', places)
      widget.set('markers', places
        .filter(hasLatLng)
        .map(function(place) {
          var marker = buildMarker(place)
          marker.on('click', publishPinClicked)
          marker.place = place
          marker.addTo(widget.get('markerLayer'))
          return marker
        }))
    })
  })
})

