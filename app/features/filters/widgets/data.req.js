
var $ = require('jquery')
var hub = require('widget').hub

var filters = {
  fetch: function() {
    $.get(hub.API_ROOT + '/filters', function(filters) {
      hub.trigger('filtersLoaded', filters)
    })
  }
}

hub.on('filtersNeeded', filters.fetch)
