
var asWidget = require('widget')

asWidget('place-details', function(hub) {
  var widget = this

  widget.template('/features/places/widgets/details/template.html')
  widget.on('installed', function() {
    widget.start().hide()
  })

  hub.on('showDetails', function(place) {
    widget.set('place', place)
    hub.trigger('getCategoryForPlace', place, place.set.bind(place, 'category'))
    widget.show()
  })
})
