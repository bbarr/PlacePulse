var rivets = require('rivets')
var _ = require('lodash')
var $ = require('jquery')
window.jQuery = $
require('./bower_components/mjolnic-bootstrap-colorpicker/dist/js/bootstrap-colorpicker')

rivets.adapters['.'] = {
  subscribe: function(obj, keypath, callback) { },
  unsubscribe: function(obj, keypath, callback) { },
  read: function(obj, keypath) {
    return obj[keypath]
  },
  publish: function(obj, keypath, value) {
    obj[keypath] = value
    return obj
  }
}

rivets.binders['*-as-class'] = function(el, val) {
  var key = this.args[0] || ''
  var current = el.getAttribute('data-' + key) || ''
  $(el).removeClass(current).addClass(val)
  el.setAttribute('data-' + key, val)
}

rivets.binders['as-class'] = function(el, val) {
  var key = 'anon'
  var current = el.getAttribute('data-' + key) || ''
  $(el).removeClass(current).addClass(val)
  el.setAttribute('data-' + key, val)
}

rivets.adapters[':'] = {
  subscribe: function(obj, keypath, callback) {
    obj.on('change:' + keypath, callback)
  },
  unsubscribe: function(obj, keypath, callback) {
    obj.off('change:' + keypath, callback)
  },
  read: function(obj, keypath) {
    return obj.get(keypath)
  },
  publish: function(obj, keypath, value) {
    obj.set(keypath, value)
  }
}

rivets.binders['broadcast-click'] = function(el) {
  $(el).on('click', function(e) {
    hub.trigger('bodyClicked', e)
  })
}

rivets.formatters.includeIndex = function(arr) {
  return arr.map(function(item, i) {
    item.index = i + 1
    return item
  })
}

rivets.binders.modal = function(el) {
  $(el).modal()
}

rivets.formatters.last = function(arr) {
  return _.last(arr)
}

rivets.formatters.models = function(coll) {
  return coll.models
}

rivets.formatters.get = function(model, key) {
  return model.get(key)
}

rivets.formatters.invert = function(a) {
  return !a
}

rivets.formatters.ternary = function(cond, a, b) {
  return cond ? a : b
}

rivets.formatters.eql = function(a, b) {
  return a == b
}

rivets.formatters.confirm = function(fn) {
  var words = [].slice.call(arguments, 1)
  return function() {
    var args = arguments
    var self = this
    var answer = confirm(words.join(' '))
    if (answer) fn.apply(self, arguments)
  }
}

rivets.formatters.count = function(arr) {
  return (arr) ? (arr.length || 0) : 0
}

rivets.formatters.default = function(a, b) {
  return a || b
}

rivets.formatters.preventDefault = function(fn) {
  return function(e) {
    e.preventDefault()
    e.stopPropagation()
    fn.apply(this, arguments)
  }
}

rivets.binders.autoscroll = function(el, selected) {
  if (!selected) return
  var container = el.parentNode.parentNode
  var elTop = el.getBoundingClientRect().top
  if (elTop < 0) {
    el.scrollIntoView(true)
  } else if (elTop > container.scrollTop + container.clientHeight) {
    el.scrollIntoView(false)
  }
}

rivets.configure({
  handler: function(target, event, binding) {
    this.call(binding.model, event, target, binding)
  }
})
