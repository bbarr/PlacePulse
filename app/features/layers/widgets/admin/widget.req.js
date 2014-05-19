
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

  widget.create = function() {
    var layer = { places: [] }
    widget.setLayer(layer)
  }

  widget.setLayer = function(layer) {
    var layerModel = model(layer)
    layerModel.set('places', layer.places.map(model))
    widget.set('selected', layerModel)
  }

  widget.removePlace = function(_, _, binding) {
    var place = binding.view.models.place
    var layer = widget.get('selected')
    var withoutPlace = layer.get('places').filter(function(p) {
      return p.cid !== place.cid
    })
    layer.set('places', [])
    layer.set('places', withoutPlace)
  }

  widget.save = function() {
    hub.trigger('saveLayer', widget.get('selected'), widget.unselect.bind(widget))
  }

  widget.destroy = function() {
    var layer = widget.get('selected')
    hub.trigger('destroyLayer', layer, widget.unselect.bind(widget))
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

  hub.on('layerCreated layerDestroyed', hub.trigger.bind(hub, 'loadMyLayers'))

  hub.trigger('loadMyLayers')
})

