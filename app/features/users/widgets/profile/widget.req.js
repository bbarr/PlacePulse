
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

  widget.on('change:visible', function() {
    if (!widget.get('visible')) {
      widget.set('flash', false)
    }
  })

  widget.update = function() {
    hub.trigger('saveUser', widget.get('user'))
  }

  widget.resetPassword = function() {
    hub.trigger('resetPassword')
  }

  hub.on('userSaved', function() {
    widget.set('flash', {
      msg: 'Your changes are saved!',
      type: 'alert-success'
    })
  })

  hub.on('userSaveFailed', function(e) {
    widget.set('flash', {
      msg: 'Sorry, we couldn\'t save your change.',
      type: 'alert-danger'
    })
  })

  hub.on('passwordReset', function() {
    widget.set('flash', { 
      msg: 'OK! We sent you a password reset email.',
      type: 'alert-success'
    })
  })

  hub.on('passwordResetFailed', function() {
    widget.set('flash', {
      msg: 'Hm. We weren\'t able to send you a password reset email.',
      type: 'alert-warning'
    })
  })
})
