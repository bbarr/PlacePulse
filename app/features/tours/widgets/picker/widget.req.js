
var asWidget = require('widget')
var $ = require('jquery')

module.exports = asWidget('list-picker', function(hub) {
  var widget = this

  widget.template('/features/tours/widgets/picker/template.html')
  widget.on('installed', function() {
    widget.start().hide()
    hub.trigger('loadMyTours')
  })

  widget.pick = function(_, _, binding) {
    var tour = binding.view.models.tour
    hub.trigger('addToTour', tour, place)
  }

  hub.on('myToursLoaded', function(tours) {
    widget.set('tours', tours)
  })

  hub.on('bodyClicked', function() {
    widget.hide()
  })

  hub.on('placeSelected', function() {
    widget.hide()
  })

  // refactor
  var place
  hub.on('showListPicker', function(p, el) {
    hub.trigger('placeSelected', p)
    place = p
    var pos = $(el).parents('li').offset()
    pos.left -= 210
    $(widget.get('el')).css(pos)
    widget.show()
  })
})
