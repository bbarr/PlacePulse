
var $ = require('jquery')
var hub = require('widget').hub

var filters = {
  fetch: function() {
    $.get('http://localhost:3000/filters', function(filters) {
      hub.trigger('filtersLoaded', filters)
    })
  }
}

hub.on('filtersNeeded', filters.fetch)
