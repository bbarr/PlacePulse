
var $ = require('jquery')
var hub = require('widget').hub

var layers = {

  fetch: function() {
    $.get('http://localhost:3000/lists', function(layers) {
      hub.trigger('layersLoaded', layers)
    })
  },

  fetchMine: function() {
    $.get('http://localhost:3000/lists/mine', function(layers) {
      hub.trigger('myLayersLoaded', layers)
    })
  },

  save: function(layer) {
    var raw = layer.attributes
    raw.places = raw.places.map(function(p) { return p.attributes })
    $.ajax({
      url: 'http://localhost:3000/lists/' + raw._id, 
      type: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify(raw), 
      success: function() {
        hub.trigger('loadMyLayers')
      }
    })
  }
}

hub.on('loadLayers', layers.fetch, layers)
hub.on('loadMyLayers', layers.fetchMine, layers)
hub.on('saveLayer', layers.save, layers)
