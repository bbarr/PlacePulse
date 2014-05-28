
var rivets = require('rivets')
require('./rivets_config')
var Backbone = require('backbone')
var hub = require('widget').hub
var $ = require('jquery')
window.hub = hub

hub.data = new Backbone.Model

$.ajaxSetup({
  xhrFields: {
    withCredentials: true
  }
})

//hub.API_ROOT = 'http://townpulse-api.herokuapp.com'
hub.API_ROOT = 'http://localhost:3000'
//hub.API_ROOT = 'http://192.168.1.102:3000'

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
    this.get('showingMenu') ? hub.trigger('hideMenu') : hub.trigger('showMenu')
  },

  logout: function() {
    hub.trigger('logout')
  },

  showFilters: function() {
    this.get('showingFilters') ? hub.trigger('hideFilters') : hub.trigger('showFilters')
  }
})

var vm = new VM

hub.on('filtersShown', function() { vm.set('showingFilters', true) })
hub.on('filtersHidden', function() { vm.set('showingFilters', false) })
hub.on('menuShown', function() { vm.set('showingMenu', true) })
hub.on('menuHidden', function() { vm.set('showingMenu', false) })

rivets.bind(document.getElementById('app'), vm)

hub.trigger('showWelcome')

