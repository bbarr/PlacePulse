

var asWidget = require('widget')
var Backbone = require('backbone')

module.exports = asWidget('places-admin', function(hub) {
  var widget = this

  widget.template('/features/places/widgets/admin/template.html')

  widget.on('installed', function() {
    widget.start().hide()
  })

  widget.save = function() {
    hub.trigger('savePlace', widget.place)
  }

  hub.on('placeSaved', function() {
    widget.set('saved', true)
  })

  widget.on('change:visible', function() {
    if (widget.get('visible')) {
      widget.set('saved', false)
      widget.set('place', new Backbone.Model)
    }
  })

  hub.on('admin:pane', function(name) {
    name == 'places' ? widget.show() : widget.hide()
  })
})
