
var asWidget = require('widget')
var Backbone = require('backbone')
var _ = require('lodash')

module.exports = asWidget('layers-admin', function(hub) {
  var widget = this

  widget.template('/features/layers/widgets/admin/template.html')

  widget.on('installed', function() {
    widget.start().hide()
  })

  hub.on('admin:pane', function(name) {
    name == 'layers' ? widget.show() : widget.hide()
  })

  function model(obj) { return new Backbone.Model(obj) }

  widget.select = function(_, _, binding) {
    var layer = binding.view.models.layer
    widget.setLayer(layer)
  }

  widget.setLayer = function(layer) {
    var layerModel = model(layer)
    layerModel.set('places', layer.places.map(model))
    widget.set('selected', layerModel)
  }

  widget.save = function() {
    hub.trigger('saveLayer', widget.get('selected'))
  }

  widget.unselect = function() {
    widget.set('selected', null)
  }

  hub.on('addToLayer', function(layer, place) {
    var myLayer = _.find(widget.get('layers'), { _id: layer._id })
    hub.trigger('showMenu')
    hub.trigger('admin:pane', 'layers')
    myLayer.places.push(place.attributes)
    widget.setLayer(myLayer)
  })

  hub.on('myLayersLoaded', function(layers) {
    widget.set('layers', layers)
  })

  hub.trigger('loadMyLayers')
})

