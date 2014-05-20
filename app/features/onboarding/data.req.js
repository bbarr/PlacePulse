
var $ = require('jquery')
var hub = require('widget').hub

var API_ROOT = hub.API_ROOT

function armUser(user) {
  hub.trigger('currentUser', user)
}

var user = {

  checkAuthentication: function() {
    $.get(API_ROOT + '/session')
      .success(function(user) {
        armUser(user)
        hub.trigger('authenticationChanged', user)
      }).error(function(e) {
        hub.trigger('authenticationChanged', null)
      })
  },

  login: function(user) {
    $.ajax({
      url: API_ROOT + '/session',
      type: 'POST',
      data: {
        email: user.get('email'), 
        password: user.get('password')
      },
      success: function(user) {
        armUser(user)
        hub.trigger('authenticationChanged', user)
      }
    })
  },

  logout: function() {
    $.ajax({
      type: 'DELETE',
      url: API_ROOT + '/session',
      success: function() {
        hub.trigger('authenticationChanged', null)
      }
    })
  },

  signup: function(user) {
    $.ajax({
      url: API_ROOT + '/users',
      type: 'POST',
      data: {
        firstName: user.get('firstName'),
        lastName: user.get('lastName'),
        email: user.get('email'), 
        password: user.get('password')
      },
      success: function(user) {
        armUser(user)
        hub.trigger('authenticationChanged', user)
      }
    })
  }
}

hub.on('login', user.login, user)
hub.on('logout', user.logout, user)
hub.on('signup', user.signup, user)
hub.on('logged?', user.checkAuthentication, user)

module.exports = user
