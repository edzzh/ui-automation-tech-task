Feature: Validate hotel booking functionality in PHPTRAVELS

  Background: Initial setup
    Given I am on landing page of PHPTRAVELS
    Then I setup language property as "English"
    And setup currency property as "USD"

  Scenario: Book first listed hotel
    Given I have account created
      And I am in "Home" page
    When I set up destination as "Liepaja"
      And I set dates "20-01-2020" - "25-01-2020"
      And I select "2" adults and "1" children
      And I click on "Search" button
      And I click on "Details" for fist hotel in the list
      And "Details" page is opened for selected hotel
      And I click on "Book now" button for first available room
    Then "Checkout" page is displayed
      And I enter valid booking information
      And I click on "COMPLETE BOOKING" button
      And "Purchase hotel booking" page is displayed
