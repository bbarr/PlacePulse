
var asWidget = require('widget')

asWidget('admin-admin', function(hub) {
  var widget = this

  widget.template('/features/admin/widgets/modal/template.html')

  widget.on('installed', function() {
    widget.start().hide()
  })

  hub.on('admin:pane', function(name) {
    name == 'admin' ? widget.show() : widget.hide()
  })

  hub.on('layersLoaded', function(layers) {
    widget.set('lists', layers)
  })

  hub.trigger('loadLayers')
})
