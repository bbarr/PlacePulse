
var asWidget = require('widget')

module.exports = asWidget('places-list', function(hub) {
  var widget = this

  widget
    .template('/features/places/widgets/list/template.html')
    .on('installed', function() {
      widget.start()
    })
})
