
var $ = require('jquery')
var hub = require('widget').hub
var _ = require('lodash')

var filters = {
  fetch: function() {
    $.get(hub.API_ROOT + '/filters', function(filters) {
      decorate(filters.categories, categoryDecorations)     
      hub.trigger('filtersLoaded', filters)
    })
  }
}

function decorate(cats, decs) {
  cats.forEach(function(cat) {
  	_.extend(cat, (decs[cat.name] || {}))
  })
}

var categoryDecorations = {
  food: {
  	className: 'food',
  	icon: 'fa-fork'
  }
}

hub.on('filtersNeeded', filters.fetch)
