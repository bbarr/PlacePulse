
var rivets = require('rivets')
require('./rivets_config')
var Backbone = require('backbone')
var hub = require('widget').hub
var $ = require('jquery')

$.ajaxSetup({
  xhrFields: {
    withCredentials: true
  }
})

require('./features/map/widgets/map_widget')

// require all widgets

var VM = Backbone.Model.extend({

  initialize: function() {
    hub.on('authenticationChanged', this.set.bind(this, 'currentUser'))
    hub.trigger('logged?')
  },
  
  showOnboarding: function() {
    hub.trigger('showOnboarding')
  },

  showMenu: function() {
    hub.trigger('showMenu')
  },

  logout: function() {
    hub.trigger('logout')
  }
})

rivets.bind(document.getElementById('app'), new VM)
