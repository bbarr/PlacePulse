
var asWidget = require('widget')

asWidget('cluster-tooltip', function(hub) {
  var widget = this

  widget.set('position', { x: 0, y: 0 })

  widget.template('/features/map/widgets/cluster-tooltip/template.html')
  widget.on('installed', function() {
    widget.start().hide()
  })

  hub.on('showClusterTooltip', function(pos, places) {
    widget.set('position', pos)
    widget.set('places', places)
    widget.show()
    
    // TODO hack
    widget.get('el').children[0].style.marginTop = -1 * (places.length * 20) + 'px'
  })

  hub.on('bodyClicked hideClusterTooltip', function() {
    widget.hide()
  })
})
