Feature: User registration
  As a user
  I want to register with TownPulse
  So I can fully interact with the site

  Scenario: Accessing the registration form
    Given I am on the home page
    When I click on 'onboard'
    Then I should see the 'onboarding' modal

  Scenario: Registering with incorrect
