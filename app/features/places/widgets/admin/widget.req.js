

var asWidget = require('widget')

module.exports = asWidget('places-admin', function(hub) {
  var widget = this

  widget.template('/features/places/widgets/admin/template.html')

  widget.on('installed', function() {
    widget.start().hide()
  })

  hub.on('admin:pane', function(name) {
    name == 'places' ? widget.show() : widget.hide()
  })
})
