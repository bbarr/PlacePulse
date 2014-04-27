
browser = require('./browser')
util = require('./util')
expect = require('expect.js')

describe 'User Onboarding', ->

  beforeEach (done) ->
    browser.visit('/', done)

  describe 'onboarding button', ->

    it 'should exist', ->
      expect(util.selectors.onboardingButton).to.be.found(browser)

    describe 'clicking it', ->

      it 'should open the onboarding modal', (done) ->
        browser.pressButton util.selectors.onboardingButton,  ->
          expect(util.selectors.onboardingModal).to.be.found(browser)
          done()

