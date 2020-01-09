import { Given, When, Then } from "cucumber";
import bookingPage from '../page_objects/BookingPage';
import assert from "assert";

let hotelPrice = null;

When(/^I set up destination as "([^"]*)"$/, (destination) => {
  bookingPage.destinationInput.click();
  browser.pause(1000);
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

    // Validate if Adults count is as expected
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

    // Validate if Children count is as expected
    assert.strictEqual(childCount.toString(), children);
  } else if (childCount > parseInt(children)) {
    console.log('child count is higher')
  }
});

When(/^I click on "Search" button$/, () => {
  bookingPage.hotelsSearchButton.waitForDisplayed(
    5000,
    false,
    `HOTELS Search Button is not displayed`
  );

  bookingPage.hotelsSearchButton.click();
});

When(/^I click on "Details" for fist hotel in the list$/, () => {
  bookingPage.hotelResultList.waitForDisplayed(
    5000,
    false,
    `HOTEL List is not displayed`
  );

  bookingPage.hotelResultList.$$('li')[0].$('button').click();
});

When(/^"Details" page is opened for selected hotel$/, () => {
  bookingPage.hotelDetailHeader.waitForDisplayed(
    5000,
    false,
    `Details Header is not displayed`
  );
});

When(/^I click on "Book now" button for first available room$/, () => {
  bookingPage.availableRoomsButton.waitForDisplayed(
    10000,
    false,
    `Available Rooms Button is not displayed`
  );

  bookingPage.availableRoomsButton.click();

  // Save hotel price for later validation
  hotelPrice = bookingPage.firstHotelRoomPrice.getText();

  bookingPage.firstHotelRoomBookButton.waitForDisplayed(
    5000,
    false,
    `BOOK Button for first available room is not displayed`
  );

  bookingPage.firstHotelRoomBookButton.click();
});

Then(/^"Checkout" page is displayed$/, () => {
  bookingPage.hotelDetails.waitForDisplayed(
    5000,
    false,
    `Hotel Details is not displayed`
  );

  // Validate checkout page details
  assert.strictEqual(bookingPage.hotelCheckInDate.getText(), "2020-01-20");
  assert.strictEqual(bookingPage.hotelCheckOutDate.getText(), "2020-01-25");
  assert.strictEqual(bookingPage.hotelPriceCheck.getText(), `USD${hotelPrice}`);
});

Then(/^I enter valid booking information$/, () => {
  bookingPage.bookingForm.waitForDisplayed(
    5000,
    false,
    `Booking Form is not displayed`
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
    `COMPLETE BOOKING Button is not displayed`
  );

  bookingPage.completeBookingButton.click();
});

Then(/^"Purchase hotel booking" page is displayed$/, () => {
  bookingPage.purchaseBookingPage.waitForDisplayed(
    5000,
    false,
    `Purchase Booking Page is not displayed`
  );
});

When(/^I click on Details for the cheapest hotel in the list with a rating above "([^"]*)" stars$/, (rating) => {
  bookingPage.viewMoreHotelsButton.waitForDisplayed(
    5000,
    false,
    `VIEW MORE Button is not displayed`
  );

  bookingPage.viewMoreHotelsButton.scrollIntoView({behavior: "auto", block: "center", inline: "center"});

  while (bookingPage.viewMoreHotelsButton.isDisplayed()) {
    bookingPage.viewMoreHotelsButton.waitForDisplayed(
      2000,
      false,
      `View More button is not displayed`
    );
    bookingPage.viewMoreHotelsButton.click();
  }

  const hotelResults = [...bookingPage.hotelResultList.$$('li')];

  // Store hotel names with 3 or above stars
  let hotelsThreeStarsOrAbove = [];
  hotelResults.map(hotel => {
    if (parseInt(hotel.$('div[class="rating-item rating-sm rating-inline"] > p > span').getText().substring(0,1)) > rating) {
      hotelsThreeStarsOrAbove.push(hotel.$('div[class="rtl-mr-auto"] > h5 > a').getText());
    }
  });

  // Store all available hotel prices
  // Due to 155 avaiable hotel records in RIGA, I only went through 20 on every iteration
  let hotelPrices = [];
  for (let i = 0; i < hotelsThreeStarsOrAbove.length; i++) {
    for (let j = 0; j < 20; j++) {
      if (hotelsThreeStarsOrAbove[i] === hotelResults[j].$('div[class="rtl-mr-auto"] > h5 > a').getText()) {
        hotelPrices.push(parseFloat(hotelResults[j].$('div[class="price"] > span').getText().substring(4)));
      }
    }
  }

  // Get Lowest Hotel Price
  const lowestHotelPrice = Math.min.apply(Math, hotelPrices);

  // Get the cheapest hotel by the definition
  let cheapestHotels = [];
  for (let i = 0; i < hotelResults.length; i++) {
    if (parseFloat(hotelResults[i].$('div[class="price"] > span').getText().substring(4)) === lowestHotelPrice) {
      cheapestHotels.push(hotelResults[i]);
    }
  }

  // Scroll To The Element and click
  cheapestHotels[0].$('button').scrollIntoView({behavior: "auto", block: "end", inline: "end"});
  cheapestHotels[0].$('button').click();
});

When(/^I click on "Book now" button for the cheapest available room in the hotel$/, () => {
  bookingPage.availableRoomsButton.waitForDisplayed(
    10000,
    false,
    `Available Rooms Button is not displayed`
  );

  bookingPage.availableRoomsButton.click();

  // Store all hotel room prices
  let hotelRoomPrices = [];
  for (let i = 0; i < bookingPage.hotelRoomPrice.length; i++) {
    hotelRoomPrices.push(parseFloat(bookingPage.hotelRoomPrice[i].getText()));
  }

  // Get Lowest Hotel Room Price
  const lowestHotelRoomPrice = Math.min.apply(Math, hotelRoomPrices);
  hotelPrice = lowestHotelRoomPrice;

  // Store cheapest hotel room element by the lowest price
  let cheapestRoom = null;
  for (let i = 0; i < bookingPage.availableRoomsList.length; i++) {
    let roomPrice = parseFloat(bookingPage.availableRoomsList[i].$(
      'div > div:nth-child(2) > div > div:nth-child(2) > p > span'
    ).getText());

    if (roomPrice === lowestHotelRoomPrice) {
      cheapestRoom = bookingPage.availableRoomsList[i];
    }
  }

  // Scroll To The Element and click
  cheapestRoom.$(
    'div > div:nth-child(2) > div > div:nth-child(2) > form > button'
  ).scrollIntoView({behavior: "auto", block: "center", inline: "center"});
  cheapestRoom.$(
    'div > div:nth-child(2) > div > div:nth-child(2) > form > button'
  ).click();
});
