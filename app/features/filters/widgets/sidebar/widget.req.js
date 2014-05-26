var asWidget = require('widget')

module.exports = asWidget('filters', function(hub) {
  var widget = this

  widget
    .template('/features/filters/widgets/sidebar/template.html')
    .on('installed', function() {
      widget.set('list', 'tours')
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

  hub.on('showFilters', function() {
    widget.show()
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

  hub.on('filtersLoaded', function(filters) {
    widget.set('categories', filters.categories)
    widget.set('tours', filters.tours)
  })

  hub.on('filterSelected', widget.hide, widget)

  hub.trigger('filtersNeeded')
})
