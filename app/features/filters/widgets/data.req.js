
var $ = require('jquery')
var hub = require('widget').hub
var _ = require('lodash')

function fetch() {
  $.ajax({
    type: 'GET',
    url: hub.API_ROOT + '/filters',
    success: function(filters) {
      hub.trigger('filtersLoaded', filters)
    }
  })
}

hub.on('filtersNeeded', fetch)
