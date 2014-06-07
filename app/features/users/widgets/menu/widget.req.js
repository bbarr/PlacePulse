
var asWidget = require('widget')

module.exports = asWidget('menu', function(hub) {
  var widget = this

  widget.template('/features/users/widgets/menu/template.html')

  widget.set('pane', '')
  widget.on('change:pane', function() {
    hub.trigger('admin:pane', this.get('pane'))
  })

  hub.on('admin:pane', function(pane) {
    widget.set('pane', pane)
  })

  var setPane = function(name) { return widget.set.bind(widget, 'pane', name) }
  widget.showProfile = setPane('profile')
  widget.showPlaces = setPane('places')
  widget.showTours = setPane('tours')
  widget.showAdmin = setPane('admin')

  widget.on('installed', function() {
    widget.start().hide()
  })

  widget.on('change:visible', function() {
    hub.trigger(widget.get('visible') ? 'menuShown' : 'menuHidden')
  })

  hub.on('showMenu', function() {
    widget.show()
    widget.showTours()
  })

  hub.on('hideMenu', function() {
    widget.show()
    widget.showTours()
  })
})
