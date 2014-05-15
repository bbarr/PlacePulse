
var asWidget = require('widget')

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
    widget.set('places', places)
  })

  hub.trigger('findPlaces')
})
