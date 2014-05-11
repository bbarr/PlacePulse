
var rivets = require('rivets')
require('./rivets_config')
var Backbone = require('backbone')
var hub = require('widget').hub
var $ = require('jquery')
var cats = require('./util/place_categories')
window.hub = hub

$.ajaxSetup({
  xhrFields: {
    withCredentials: true
  }
})

// require all widgets

var VM = Backbone.Model.extend({

  initialize: function() {
    hub.on('authenticationChanged', this.set.bind(this, 'currentUser'))
    hub.trigger('logged?')
  },

  placeCategories: cats,

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
