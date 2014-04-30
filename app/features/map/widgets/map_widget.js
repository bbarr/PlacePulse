
var asWidget = require('widget')
var rivets = require('rivets')

module.exports = asWidget('map', function() {

  rivets.binders.map = function(el) {
    new google.maps.Map(el, {
      center: new google.maps.LatLng(-34.397, 150.644),
      zoom: 8
    })
  }

  var widget = this

  widget.on('installed', function() {

    widget
      .template('/boo.html')
      .assets([
        '/boo.css',
        [ "https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&.js", function() { return google.maps.Map } ],
      ], function() {
        widget.start()
      })
  })
})
