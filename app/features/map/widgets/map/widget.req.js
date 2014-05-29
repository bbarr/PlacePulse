
var asWidget = require('widget')
var rivets = require('rivets')
var $ = require('jquery')
var _ = require('lodash')

// injects global L
require('mapbox.js')
require('../../../../bower_components/leaflet.markercluster/dist/leaflet.markercluster')

module.exports = asWidget('map', function(hub) {
  var widget = this

  widget.on('installed', function() {
    widget
      .template('/features/map/widgets/map/template.html')
      .assets([ 'https://api.tiles.mapbox.com/mapbox.js/v1.6.2/mapbox.css' ], function() {
        // have to show map here before bindings so mapbox works right
        widget.show()
        widget.start()
      })
  })

  // some state
  var map
  var clusters
  var tooltip

  // get map binding ready
  rivets.binders.map = function(el) {

    map = L.mapbox.map('map', 'bbarr.map-tvg4iseh', {
      center: [ 41.7898313, -69.9897397 ],
      zoom: 16,
      minZoom: 15,
      maxZoom: 17
    })
    widget.set('map', map)

    var clusters = L.markerClusterGroup({
      spiderfyOnMaxZoom: false, 
      showCoverageOnHover: false, 
      zoomToBoundsOnClick: false,
      singleMarkerMode: false,
      iconCreateFunction: function(cluster) {
        return L.divIcon({ 
          className: 'tp-marker', 
          html: '<div class="inner">' + cluster.getChildCount() + '</div>',
          iconSize: [ 40, 40 ]
        })
      }
    })

    clusters.on('clusterclick', function(a) {
      var marker = a.layer.getAllChildMarkers()[0]
      selectMarker(marker)
    })

    clusters.addTo(widget.get('map'))
    widget.set('clusters', clusters)

    tooltip = L.popup({ autoPanPadding: [ 100, 100 ], offset: [ 0, -20 ], className: 'tp-map-tooltip', closeButton: false, width: 300, maxHeight: 300 })
  }

  function buildMarker(place) {
    return L.marker(buildLatLng(place), { 
      icon: L.divIcon({ 
        className: 'tp-marker ' + place.get('category').className, 
        html: '<div class="inner">1</div>',
        iconSize: [ 40, 40 ]
      }) 
    })
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

  function isClustered(marker) {
    return !marker._icon && marker.place
  }
  
  function isCluster(layer) {
    return layer._markers
  }

  function containsMarker(marker, clusterLayer) {
    return _.contains(clusterLayer.getAllChildMarkers(), marker)
  }

  function unhighlightMarkers() {
    $('.tp-active').removeClass('tp-active')
  }

  function highlightMarker(marker) {
    marker._icon.className += ' tp-active'
  }

  // TODO 
  function openTooltip(marker) {
    var subMarkers = isCluster(marker) ? marker.getAllChildMarkers() : [ marker ]
    tooltip.setLatLng(marker.getLatLng())
    var listingHTML = "<div class='tooltip-listing' rv-each-place='places' rv-on-click='openDetails | preventDefault'><strong>{ place:name }</strong><div>{ place:location.street }<i class='fa fa-chevron-circle-right'></i></div></div>"
    var el = $('<div>' + listingHTML + '</div>').get(0)
    rivets.bind(el, {
      places: _.pluck(subMarkers, 'place'),
      openDetails: function(_, _, binding) {
        var place = binding.view.models.place
        hub.trigger('showDetails', place)
        hub.trigger('placeSelected', place)
      }
    })
    tooltip.setContent(el)
    tooltip.openOn(map)
  }

  function unselectMarker() {
    unhighlightMarkers()
    map.closePopup(tooltip)
  }

  function selectMarker(marker) {

    var clusters = widget.get('clusters')
    if (isClustered(marker)) {

      var clusterLayers = clusters._featureGroup.getLayers().filter(isCluster)
      var clusterLayer = _.find(clusterLayers, _.partial(containsMarker, marker))
      var clusteredMarkers = clusterLayer.getAllChildMarkers()

      highlightMarker(clusterLayer)
      openTooltip(clusterLayer)
    } else {
      highlightMarker(marker)
      openTooltip(marker)
    }
  }

  hub.on('filterSelected', function(filters) {
    var filter = filters.category || filters.tour || {}
    widget.set('className', filter.className)
  })

  hub.on('placesLoaded', function(places) {
    widget.get('clusters').clearLayers()
    widget.set('places', places)
    widget.set('markers', places
      .filter(hasLatLng)
      .map(function(place) {
        var marker = buildMarker(place)
        marker.on('click', function(e) { 
          hub.trigger('placeSelected', e.target.place)
        })
        marker.place = place
        marker.addTo(widget.get('clusters'))
        return marker
      }))
  })

  hub.on('placeSelected', function(place) {
    unselectMarker()
    var marker = findMarker(place)
    selectMarker(marker)
  })

  hub.on('bodyClicked', function() {
    hub.trigger('placeUnselected')
  })

  hub.on('placeUnselected', function() {
    unhighlightMarkers()
  })

  hub.on('placesLoading', function() {
    unselectMarker()
    widget.loading()
  })

  hub.on('placesLoaded', widget.loaded, widget)
})

