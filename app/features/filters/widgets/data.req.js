
var $ = require('jquery')
var hub = require('widget').hub
var _ = require('lodash')

var cache

function fetch() {
  $.ajax({
    type: 'GET',
    url: hub.API_ROOT + '/filters',
    success: function(filters) {
      cache = filters
      hub.trigger('filtersLoaded', filters)
    }
  })
}

hub.on('filtersNeeded', fetch)

hub.on('getCategoryForPlace', function(place, cb) {
  if (!cache) return {}
  if (place.get('category')) return place.get('category')

  var category = _.find(cache.categories, function(cat) {
    var id = (place.get('categoryIds') || [])[0]
    if (!id) return
    return _.find(cat.factualIds, function(set) {
      var pairs = set.split('-')
      if (pairs[1]) {
        return parseInt(pairs[0]) < id && id < parseInt(pairs[1]) + 1
      } else {
        return parseInt(set) == id
      }
    })
  })

  cb(category)
})
