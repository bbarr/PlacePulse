
var asWidget = require('widget')
var _ = require('lodash')

module.exports = asWidget('places-list', function(hub) {
  var widget = this

  widget.attributes.places = []

  widget
    .template('/features/places/widgets/list/template.html')
    .on('installed', function() {
      widget.start()
    })

  widget.select = function(_, _, binding) {
    var place = binding.view.models.place
    hub.trigger('placeSelected', place)
  }

  widget.addToList = function(e, _, binding) {
    var place = binding.view.models.place
    hub.trigger('showListPicker', place, e.target)
  }

  hub.on('placesLoaded', function(places) {
    widget.set('places', [])
    widget.set('places', places)
  })

  hub.on('filterSelected', function(filters) {
    var filter = filters.category||filters.list
    widget.set('title', filter.name)
    widget.set('className', filter.className)
  })


  hub.on('placeSelected', function(place) {
    widget.get('places').forEach(function(p) { p.set('selected', false) })
    place.set('selected', true)
  })

  hub.on('bodyClicked', function() {
    var selected = _.find(widget.get('places'), function(p) { return p.get('selected') })
    if (selected) selected.set('selected', false)
  })

  hub.trigger('findPlaces')
})
