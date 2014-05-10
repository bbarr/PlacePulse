
var asWidget = require('widget')

module.exports = asWidget('tours-admin', function(hub) {
  var widget = this

  hub.on('admin:pane', function(name) {
    name == 'tours' ? widget.show() : widget.hide()
  })
})
