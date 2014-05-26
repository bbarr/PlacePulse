var asWidget = require('widget')

asWidget('welcome', function(hub) {
  var widget = this

  widget
    .template('/features/filters/widgets/welcome/template.html')
    .on('installed', function() {
      widget.start().hide()
    })

  hub.on('showWelcome', function() {
    widget.show()
  })

})
