
var asWidget = require('widget')
var $ = require('jquery')

module.exports = asWidget('list-picker', function(hub) {
  var widget = this

  widget.template('/features/layers/widgets/picker/template.html')
  widget.on('installed', function() {
    widget.start().hide()
    hub.trigger('loadMyLayers')
  })

  widget.pick = function(_, _, binding) {
    var layer = binding.view.models.layer
    hub.trigger('addToLayer', layer, place)
  }

  hub.on('myLayersLoaded', function(layers) {
    widget.set('layers', layers)
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
