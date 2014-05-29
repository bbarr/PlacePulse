
var asWidget = require('widget')
var Backbone = require('backbone')
var _ = require('lodash')

module.exports = asWidget('places-admin', function(hub) {
  var widget = this

  widget.template('/features/places/widgets/admin/template.html')

  widget.on('installed', function() {
    widget.start().hide()
  })

  widget.save = function() {

    var raw = widget.get('place').attributes
    var categories = widget.get('categories')
    _.each(categories, function(cat) {
      _.each(cat.subCategories, function(sub) {
        if (sub.id == raw.category) {
          raw.categoryIds = sub.categoryIds
          raw.categoryLabels = sub.categoryLabels
          delete raw.category
        }
      })
    })

    hub.trigger('savePlace', raw)
  }

  hub.on('placeSaved', function() {
    widget.set('saved', true)
  })

  widget.on('change:visible', function() {
    if (widget.get('visible')) {
      widget.setPlace(new Backbone.Model)
    }
  })

  widget.reset = function() {
    widget.set('saved', false)
    widget.setPlace(new Backbone.Model)
  }

  widget.setPlace = function(place) {
    widget.set('saved', false)
    widget.set('place', place)
  }

  hub.on('filtersLoaded', function(filters) {
    widget.set('categories', filters.categories)
  })

  hub.on('admin:pane', function(name) {
    name == 'places' ? widget.show() : widget.hide()
  })
})
