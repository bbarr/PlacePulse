
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

  save: function(layer, cb) {
    var raw = layer.attributes
    raw.places = raw.places.map(function(p) { return p.attributes })
    var isNew = !raw._id
    $.ajax({
      url: 'http://localhost:3000/lists' + (isNew ? '' : ('/' + raw._id)),
      type: isNew ? 'POST' : 'PUT',
      contentType: 'application/json',
      data: JSON.stringify(raw), 
      success: function() {
        hub.trigger('layerCreated')
        if (cb) cb()
      }
    })
  },

  destroy: function(layer, cb) {
    $.ajax({
      url: 'http://localhost:3000/lists/' + layer.get('_id'),
      type: 'DELETE',
      success: function() {
        hub.trigger('layerDestroyed')
        if (cb) cb()
      }
    })
  }
}

hub.on('loadLayers', layers.fetch, layers)
hub.on('loadMyLayers', layers.fetchMine, layers)
hub.on('saveLayer', layers.save, layers)
hub.on('destroyLayer', layers.destroy, layers)
