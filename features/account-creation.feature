Feature: Validate account creation functionality in PHPTRAVELS

  Background: Initial setup
    Given I am on landing page of PHPTRAVELS
    Then I setup language property as "English"
      And setup currency property as "USD"

  Scenario: Account creation
    Given I am in Sign Up page
    When I valid user details in Register section
      And click on “SIGN UP” button
      And My Account page is opened
      And I click on “MY PROFILE” button
    Then “MY PROFILE” section is opened
      And correct personal information is displayed
