
var expect = require('expect.js')

function SharedStepsWrapper() {

  this.World = require("../support/world.js").World

  this.When(/^I click on '(.+)'$/, function (name, callback) {
    this.browser.pressButton(name, callback)
  });

  this.Then(/^I should see the '(.+)' modal$/, function (modalType, callback) {
    expect(this.browser.query('#modal').getAttribute('for')).to.be(modalType)
    callback()
  });
}

module.exports = SharedStepsWrapper
