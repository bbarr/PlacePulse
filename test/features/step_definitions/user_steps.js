
function UserStepsWrapper() {

  this.World = require("../support/world.js").World

  this.Given(/^I am on the home page$/, function (callback) {
    this.visit('http://localhost:8080', callback)
  });

}

module.exports = UserStepsWrapper
