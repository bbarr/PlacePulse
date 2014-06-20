
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
          raw.categoryLabels = [ sub.categoryLabels ]
          delete raw.category
        }
      })
    })

    if (!raw.factualId) delete raw.factualId
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
    widget.set('welcome', "Can't find a place you are looking for? Give us whatever details you can, and we will work to add it into the system!")
    widget.set('thanks', "Thanks for submitting a new place! We will review the information and then add it to our place library soon.")
    widget.set('editing', false)
    widget.set('saved', false)
    widget.set('place', place)
  }

  hub.on('filtersLoaded', function(filters) {
    widget.set('categories', filters.categories)
  })

  hub.on('admin:pane', function(name) {
    name == 'places' ? widget.show() : widget.hide()
  })

  hub.on('editPlace', function(place) {
    hub.trigger('showMenu')
    hub.trigger('admin:pane', 'places')
    widget.setPlace(new Backbone.Model({
      factualId: place.get('factualId'),
      name: place.get('name'),
      address: place.get('location').street,
      category: place.get('categoryIds')[0],
      about: place.get('description'),
      history: place.get('history')
    }))
    widget.set('editing', true)
    widget.set('welcome', "Found some missing or incorrect data? Add or edit the basic details and we will work to update the listing")
    widget.set('thanks', "Thanks for submitting updated infromation. We will review and publish the changes soon!")
  })
})
