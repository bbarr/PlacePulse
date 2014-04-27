var zombie = require('zombie');

var World = function World(callback) {
  this.browser = new zombie({ debug: false })

  this.visit = function(url, callback) {
    this.browser.visit(url, callback)
  };

  callback()
};

exports.World = World;
