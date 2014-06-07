
var asWidget = require('widget')
var _ = require('lodash')

module.exports = asWidget('places-list', function(hub) {
  var widget = this

  widget.attributes.places = []

  widget
    .template('/features/places/widgets/list/template.html')
    .on('installed', function() {
      widget.start()
    })

  widget.showFilters = function() {
    hub.trigger('showFilters')
  }

  widget.select = function(_, _, binding) {
    var place = binding.view.models.place
    hub.trigger('placeSelected', place)
  }

  widget.addToList = function(e, _, binding) {
    var place = binding.view.models.place
    hub.trigger('showListPicker', place, e.target)
  }

  widget.editPlace = function(e, _, binding) {
    if (widget.get('user')) {
      var place = binding.view.models.place
      hub.trigger('editPlace', place)
    } else {
      hub.trigger('showOnboarding', 'You must sign up/log in to edit a place.')
    }
  }

  hub.on('placesLoaded', function(places) {
    console.log('places are loaded')
    widget.set('places', [])
    widget.set('places', places)
    widget.loaded()
  })

  hub.on('filterSelected', function(filters) {
    var filter = filters.category||filters.tour ||{}
    widget.set('title', filter.name)
    widget.set('className', filter.className)
    widget.set('icon', filter.icon)
    widget.set('icon_img', filter.icon_img)
  })


  hub.on('placeSelected', function(place) {
    widget.get('places').forEach(function(p) { p.set('selected', false) })
    place.set('selected', true)
  })

  hub.on('bodyClicked', function() {
    var selected = _.find(widget.get('places'), function(p) { return p.get('selected') })
    if (selected) selected.set('selected', false)
  })

  hub.trigger('findPlaces')
  hub.on('placesLoading', function() {
    console.log('places are loading')
    widget.loading()
  })

  hub.on('authenticationChanged', function(user) {
    widget.set('user', user)
  })
})
