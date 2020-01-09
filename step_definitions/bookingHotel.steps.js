import { Given, When, Then } from "cucumber";
import bookingPage from '../page_objects/BookingPage';
import assert from "assert";

let hotelPrice = null;

When(/^I set up destination as "([^"]*)"$/, (destination) => {
  bookingPage.destinationInput.click();
  bookingPage.destinationInputField.setValue(destination);

  const destinationElement = bookingPage.destinationResultsUl.$$('li').filter(destinations => {
    return destinations.$('div').$('span').getText() === destination;
  });

  destinationElement[0].click();

  browser.waitUntil(() => {
    return bookingPage.destinationSelectedResult.getText().includes(destination);
  }, 5000, `Destination is not selected`);
});

When(/^I set dates "([^"]*)" - "([^"]*)"$/, (checkIn, checkOut) => {
  bookingPage.checkInInput.click();
  bookingPage.checkInInput.setValue(checkIn);
  bookingPage.checkOutInput.click();
  bookingPage.checkOutInput.setValue(checkOut);
});

When(/^I select "([^"]*)" adults and "([^"]*)" children$/, (adults, children) => {
  let adultsCount = bookingPage.adultsInput.getValue();
  let childCount = bookingPage.childrenInput.getValue();

  // Validate Adult Count for booking
  if (adultsCount === parseInt(adults)) {
    return true;
  } else if (adultsCount < parseInt(adults)) {
    const difference = parseInt(adults) - adultsCount;

    for (let i = 0; i < difference; i++) {
      bookingPage.addAdultsButton.click()
    }

    adultsCount = bookingPage.adultsInput.getValue();
    assert.strictEqual(adultsCount, parseInt(adults));
  } else if (adultsCount > parseInt(adults)) {
    console.log('adults count is higher')
  }

  // Validate Children Count for booking
  if (childCount === parseInt(children)) {
    return true;
  } else if (childCount < parseInt(children)) {
    const difference = parseInt(children) - childCount;

    for (let i = 0; i < difference; i++) {
      bookingPage.addChildButton.click()
    }

    childCount = bookingPage.childrenInput.getValue();
    assert.strictEqual(childCount.toString(), children);
  } else if (childCount > parseInt(children)) {
    console.log('child count is higher')
  }
});

When(/^I click on "Search" button$/, () => {
  bookingPage.hotelsSearchButton.waitForDisplayed(
    5000,
    false,
    `Couldn't find HOTELS Search button`
  );

  bookingPage.hotelsSearchButton.click();
});

When(/^I click on "Details" for fist hotel in the list$/, () => {
  bookingPage.hotelResultList.waitForDisplayed(
    5000,
    false,
    `Couldn't find HOTEL list`
  );

  bookingPage.hotelResultList.$$('li')[0].$('button').click();
});

When(/^"Details" page is opened for selected hotel$/, () => {
  bookingPage.hotelDetailHeader.waitForDisplayed(
    5000,
    false,
    `Couldn't find Details header`
  );
});

When(/^I click on "Book now" button for first available room$/, () => {
  bookingPage.availableRoomsButton.waitForDisplayed(
    10000,
    false,
    `Couldn't find Available Rooms button`
  );

  bookingPage.availableRoomsButton.click();

  hotelPrice = bookingPage.hotelRoomPrice.getText();

  bookingPage.hotelRoomBookButton.waitForDisplayed(
    5000,
    false,
    `Couldn't find BOOK button for first available room`
  );

  bookingPage.hotelRoomBookButton.click();
});

Then(/^"Checkout" page is displayed$/, () => {
  bookingPage.hotelDetails.waitForDisplayed(
    5000,
    false,
    `Couldn't find hotel details`
  );

  assert.strictEqual(bookingPage.hotelCheckInDate.getText(), "2020-01-20");
  assert.strictEqual(bookingPage.hotelCheckOutDate.getText(), "2020-01-25");
  assert.strictEqual(bookingPage.hotelPriceCheck.getText(), `USD${hotelPrice}`);
});

Then(/^I enter valid booking information$/, () => {
  bookingPage.bookingForm.waitForDisplayed(
    5000,
    false,
    `Couldn't find booking form`
  );

  bookingPage.bookingFirstNameInputField.setValue("TDL_TEST_NAME_1980");
  bookingPage.bookingLastNameInputField.setValue("TDL_TEST_LASTNAME_1999");
  bookingPage.bookingEmailInputField.setValue("tdl_test_email_000@gmail.com");
  bookingPage.bookingMobileInputField.setValue(Math.floor(Math.random() * 1000000000));

  bookingPage.countrySelectionDropdown.click();
  bookingPage.countrySearchBox.setValue("Latvia");
  bookingPage.countrySearcResult.click();
});

Then(/^I click on "COMPLETE BOOKING" button$/, () => {
  bookingPage.completeBookingButton.waitForDisplayed(
    5000,
    false,
    `Couldn't find COMPLETE BOOKING button`
  );

  bookingPage.completeBookingButton.click();
});

Then(/^"Purchase hotel booking" page is displayed$/, () => {
  bookingPage.purchaseBookingPage.waitForDisplayed(
    5000,
    false,
    `Couldn't find Purchase Booking page`
  );
});

When(/^I click on Details for the cheapest hotel in the list with a rating above "([^"]*)" stars$/, (rating) => {

});
