
var rivets = require('rivets')
require('./rivets_config')
var Backbone = require('backbone')
var hub = require('widget').hub
var $ = require('jquery')
window.hub = hub

$.ajaxSetup({
  xhrFields: {
    withCredentials: true
  }
})

hub.API_ROOT = 'http://townpulse-api.herokuapp.com'

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
  },

  showFilters: function() {
    hub.trigger('showFilters')
  }
})

rivets.bind(document.getElementById('app'), new VM)

hub.trigger('showFilters')

