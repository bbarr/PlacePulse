
var asWidget = require('widget')

asWidget('place-details', function(hub) {
  var widget = this

  widget.template('/features/places/widgets/details/template.html')
  widget.on('installed', function() {
    widget.start().hide()
  })

  hub.on('showDetails', function(place) {
    widget.set('place', place)
    widget.showDetails()
    widget.show()
  })

  function changeTab(name) { 
    return function() { widget.set('tab', name) }
  }
  widget.showDetails = changeTab('details')
  widget.showDescription = changeTab('description')
  widget.showHistory = changeTab('history')
  widget.showEvents = changeTab('events')
})
