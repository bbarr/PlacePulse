
var asWidget = require('widget')
var Backbone = require('backbone')

module.exports = asWidget('profile-admin', function(hub) {
  var widget = this

  widget.template('/features/users/widgets/profile/template.html')

  hub.on('currentUser', function(user) {
    widget.set('user', new Backbone.Model(user))
  })

  widget.on('installed', function() {
    widget.start().hide()
  })

  hub.on('admin:pane', function(name) {
    name == 'profile' ? widget.show() : widget.hide()
  })

  widget.update = function() {
    debugger
  }
})
