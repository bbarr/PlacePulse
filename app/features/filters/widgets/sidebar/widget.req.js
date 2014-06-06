var asWidget = require('widget')
var _ = require('lodash')

module.exports = asWidget('filters', function(hub) {
  var widget = this

  widget
    .template('/features/filters/widgets/sidebar/template.html')
    .on('installed', function() {
      widget.start().hide()
    })

  widget.selectCategory = function(_, _, binding) {
    var category = binding.view.models.category
    hub.trigger('filterSelected', { category: category })
  }

  widget.selectTour = function(_, _, binding) {
    var tour = binding.view.models.tour
    hub.trigger('filterSelected', { tour: tour })
  }

  hub.on('showFilters', function() { widget.show() })
  hub.on('hideFilters', function() { widget.hide() })
  hub.on('safeShowCategories', function() {
    if (!widget.get('list')) hub.trigger('showCategories')
  })
  hub.on('showCategories', function() {
    widget.show()
    widget.showCategories()
  })
  hub.on('showTours', function() {
    widget.show()
    widget.showTours()
  })

  widget.show = function() {
    widget.set('visible', true)
    widget.set('active', true)
  }

  widget.hide = function() {
    widget.set('active', false)
  }

  widget.showTours = function() {
    widget.set('list', 'tours')
  }

  widget.showCategories = function() {
    widget.set('list', 'categories')
  }

  widget.on('change:active', function() {
    console.log('filters visible or not')
    hub.trigger(widget.get('active') ? 'filtersShown' : 'filtersHidden')
  })

  hub.on('filtersLoaded', function(filters) {
    widget.set('categories', filters.categories)
    widget.set('tours', [])
    widget.set('tours', filters.tours)
  })

  hub.on('myToursLoaded', function(myTours) {
    if (!myTours.length) return
    if (widget.get('tours')) go()
    else widget.once('change:tours', go)
    function go() {
      var userId = myTours[0].userId
      var fresh = widget.get('tours').filter(function(t) { return t.userId !== userId })
      widget.set('tours', [])
      widget.set('tours', myTours.map(function(mt) { mt.mine = true; return mt }).concat(fresh))
    }
  })

  hub.on('filterSelected', widget.hide, widget)

  hub.trigger('filtersNeeded')
})
