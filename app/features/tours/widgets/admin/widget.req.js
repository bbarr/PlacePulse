
var asWidget = require('widget')
var Backbone = require('backbone')
var _ = require('lodash')

module.exports = asWidget('tours-admin', function(hub) {
  var widget = this

  widget.template('/features/tours/widgets/admin/template.html')

  widget.on('installed', function() {
    widget.start().hide()
  })

  hub.on('admin:pane', function(name) {
    name == 'tours' ? widget.show() : widget.hide()
  })

  function model(obj) { return new Backbone.Model(obj) }

  widget.select = function(e, o, binding) {
    var tour = binding.view.models.tour
    var tourModel = widget.setTour(tour)
    _.find(widget.get('icons'), function(i) {
      if (i.get('className') == tourModel.get('icon')) {
        i.set('selected', true)
        return true
      }
    })
  }

  widget.create = function(seed) {
    var tour = { places: [] }
    if (seed) {
      tour.places.push(seed.attributes)
    }
    widget.setTour(tour)
  }

  widget.setTour = function(tour) {
    var tourModel = model(tour)
    tourModel.set('places', tour.places.map(model))
    widget.set('selected', tourModel)
    return tourModel
  }

  widget.removePlace = function(_, _, binding) {
    var place = binding.view.models.place
    var tour = widget.get('selected')
    var withoutPlace = tour.get('places').filter(function(p) {
      return p.cid !== place.cid
    })
    tour.set('places', [])
    tour.set('places', withoutPlace)
  }

  widget.set('icons', [
    { className: 'fa-cutlery' },
    { className: 'fa-star' }
  ].map(model))

  widget.selectIcon = function(_, _, binding) {
    var icon = binding.view.models.icon
    widget.get('selected').set('icon', icon.get('className'))
    widget.get('icons').forEach(function(i) { i.set('selected', false) })
    icon.set('selected', true)
  }

  widget.save = function() {
    hub.trigger('saveTour', widget.get('selected'))
  }

  widget.destroy = function() {
    var tour = widget.get('selected')
    hub.trigger('destroyTour', tour, widget.unselect.bind(widget))
  }

  widget.unselect = function() {
    widget.set('selected', null)
    widget.set('flash', false)
  }

  widget.on('change:visible', function() {
    if (!widget.get('visible')) {
      widget.set('flash', false)
    }
  })

  hub.on('addToTour', function(tour, place) {
    var myTour = _.find(widget.get('tours'), { _id: tour._id })
    hub.trigger('showMenu')
    hub.trigger('admin:pane', 'tours')
    myTour.places.push(place.attributes)
    widget.setTour(myTour)
    widget.set('flash', false)
  })

  hub.on('myToursLoaded', function(tours) {
    widget.set('tours', tours)
  })

  hub.on('tourSaved', function(saved) {
    var tours = widget.get('tours') || []
    widget.set('tours', [])
    var newTours = tours.filter(function(tour) {
      return tour._id !== saved._id
    })
    newTours.push(saved)
    widget.set('tours', newTours) 
    widget.set('flash', {
      msg: 'Tour saved!',
      type: 'alert-success'
    })
  })

  hub.on('tourSaveFailed', function() {
    widget.set('flash', {
      msg: 'Sorry, unable to save tour.',
      type: 'alert-danger'
    })
  })

  hub.on('tourDestroyed', function(destroyed) {
    var tours = widget.get('tours')
    widget.set('tours', [])
    widget.set('tours', _.remove(tours, { _id: destroyed._id }))
  })

  hub.on('createNewTour', function(place) {
    hub.trigger('showMenu')
    hub.trigger('admin:pane', 'tours')
    widget.create(place)
  })

  hub.trigger('myToursNeeded')
})

