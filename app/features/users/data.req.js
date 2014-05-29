
var $ = require('jquery')
var hub = require('widget').hub

function save(user) {
  $.ajax({
    type: 'PUT',
    url: hub.API_ROOT + '/users/' + user.get('objectId'),
    data: user.attributes,
    success: function(user) {
      hub.trigger('userSaved', user)
    },
    error: function(e) {
      hub.trigger('userSaveFailed', e)
    }
  })
}

function resetPassword() {
  $.ajax({
    type: 'POST',
    url: hub.API_ROOT + '/users/reset-password',
    success: function(user) {
      hub.trigger('passwordReset')
    },
    error: function(e) {
      hub.trigger('resetPasswordFailed', e)
    }
  })
}

hub.on('saveUser', save)
hub.on('resetPassword', resetPassword)
