var asWidget = require('widget')

asWidget('welcome', function(hub) {
  var widget = this

  widget
    .template('/features/filters/widgets/welcome/template.html')
    .on('installed', function() {
      widget.start().set('visible', false)
    })

  widget.hide = function() {
    hub.trigger('safeShowCategories')
    widget.set('visible', false)
  }

  widget.showCategories = function() {
    widget.set('visible', false)
    hub.trigger('showCategories')
  }
  widget.showTours = function() {
    widget.set('visible', false)
    hub.trigger('showTours')
  }
  widget.showOnboarding = function() {
    widget.set('visible', false)
    hub.trigger('showSignup')
  }

  hub.on('showWelcome', function() {
    widget.show()
  })

  hub.on('hideWelcome', function() {
    widget.hide()
  })

})
