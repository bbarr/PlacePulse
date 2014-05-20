
var asWidget = require('widget')

module.exports = asWidget('menu', function(hub) {
  var widget = this

  widget.template('/features/users/widgets/menu/template.html')

  widget.set('pane', '')
  widget.on('change:pane', function() {
    hub.trigger('admin:pane', this.get('pane'))
  })

  var setPane = function(name) { return widget.set.bind(widget, 'pane', name) }
  widget.showProfile = setPane('profile')
  widget.showPlaces = setPane('places')
  widget.showLayers = setPane('layers')
  widget.showAdmin = setPane('admin')

  widget.on('installed', function() {
    widget.start().hide()
  })

  hub.on('showMenu', function() {
    widget.show()
    widget.showLayers()
  })
})
