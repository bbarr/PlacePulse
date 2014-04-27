
var expect = require('expect.js')

expect.Assertion.prototype.found = function(browser) {
  this.assert(browser.query(this.obj)
    , function(){ return 'expected ' + this.obj + ' to be in DOM' }
    , function(){ return 'expected ' + this.obj + ' to not be in DOM' })
}

expect.Assertion.prototype.visible = function(browser) {

}

var util = {

  selectors: {
    onboardingButton: 'button[name=onboard]',
    onboardingModal: '#modal[for=onboarding]'
  }
}

module.exports = util
