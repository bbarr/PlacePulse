var asWidget = require('widget')

asWidget('welcome', function(hub) {
  var widget = this

  widget
    .template('/features/filters/widgets/welcome/template.html')
    .on('installed', function() {
      widget.start().set('visible', false)
    })

  widget.hide = function() {
    hub.trigger('showCategories')
    widget.set('visible', false)
  }

  hub.on('showWelcome', function() {
    widget.show()
  })

  hub.on('hideWelcome', function() {
    widget.hide()
  })

})
