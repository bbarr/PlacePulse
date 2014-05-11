
var asWidget = require('widget')

module.exports = asWidget('places-list', function(hub) {
  var widget = this

  widget
    .template('/features/places/widgets/list/template.html')
    .on('installed', function() {
      widget.start()
    })

  hub.on('placesLoaded', function(places) {
    widget.set('places', places)
  })

  hub.trigger('findPlaces')
})
