
var asWidget = require('widget')

module.exports = asWidget('layers-admin', function(hub) {
  var widget = this

  widget.template('/features/layers/widgets/admin/template.html')

  widget.on('installed', function() {
    widget.start().hide()
  })

  hub.on('admin:pane', function(name) {
    name == 'layers' ? widget.show() : widget.hide()
  })
})

