
var asWidget = require('widget')

module.exports = asWidget('filters', function(hub) {
  var widget = this

  widget
    .template('/features/filters/widgets/modal/template.html')
    .on('installed', function() {
      widget.start().hide()
    })

  widget.selectCategory = function(_, _, binding) {
    var category = binding.view.models.category
    hub.trigger('filterSelected', { category: category })
  }

  widget.selectList = function(_, _, binding) {
    var list = binding.view.models.list
    hub.trigger('filterSelected', { list: list })
  }

  hub.on('showFilters', function() {
    widget.show()
  })

  hub.on('filtersLoaded', function(filters) {
    widget.set('categories', filters.categories)
    widget.set('lists', filters.lists)
  })

  hub.on('filterSelected', widget.hide, widget)

  hub.trigger('filtersNeeded')
})

