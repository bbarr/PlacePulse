
var asWidget = require('widget')
var Backbone = require('backbone')

module.exports = asWidget('onboarding', function(hub) {
  var widget = this

  widget.template('/features/onboarding/widgets/modal/template.html')

  widget.user = new Backbone.Model

  hub.on('showOnboarding', widget.start, widget)
  hub.on('authenticationChanged', widget.stop, widget)

  widget.on('change:forLogin', function() {
    if (widget.get('forLogin')) {
      widget.set('headline', 'Log in to your account')
      widget.set('button', 'Login')
      widget.set('alternative', "Don't have an account yet? Sign up!")
    } else {
      widget.set('headline', 'Sign up to get involved')
      widget.set('button', 'Sign up')
      widget.set('alternative', 'Already signed up? Log in!')
    }
  }, widget)

  widget.set('forLogin', true)
  widget.swap = function() {
    widget.set('forLogin', !widget.get('forLogin'))
  }

  widget.submit = function() {
    if (widget.get('forLogin')) {
      hub.trigger('login', widget.user)
    } else {
      hub.trigger('signup', widget.user)
    }
  }

})
