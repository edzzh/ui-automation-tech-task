import Page from './Page';

class BookingPage extends Page{
  constructor() {
    super();
  }

  /*
    Initial Page Elements
   */

  get destinationInput () { return $('div[id="s2id_autogen1"] > a'); }
  get destinationInputField () { return $('div[class="form-group"] > div > input[name="dest"]'); }
  get destinationResultsUl () { return $('//ul[contains(@class, "select2-result-sub")]'); }
  get destinationSelectedResult () { return $('(//span[@class="select2-chosen"])[1]'); }

  get checkInInput () { return $(`//input[@id="checkin"]`); }
  get checkOutInput () { return $(`//input[@id="checkout"]`); }
  get adultsInput () { return $('(//input[@name="adults"])[1]'); }
  get childrenInput () { return $('(//input[@name="children"])[1]'); }
  get addAdultsButton () { return $('(//button[@class="btn btn-white bootstrap-touchspin-up "])[1]'); }
  get addChildButton () { return $('(//button[@class="btn btn-white bootstrap-touchspin-up "])[2]');}
  get hotelsSearchButton () { return $('//form[@name="HOTELS"]//button[contains(text(),"Search")]');}
  get hotelResultList () { return $('ul[id="LIST"]')}
  get hotelDetailHeader () { return $('div[class="detail-header"]'); }
  get viewMoreHotelsButton () { return $('button[id="loadMore"]'); }

  get availableRoomsButton () { return $('//ul[@id="horizon-sticky-nav"]//li/a[text()="Available Rooms"]'); }
  get availableRoomsList () { return $$('div[class="room-item"]'); }
  get firstHotelRoomBookButton () { return $('//div[@class="room-item-wrapper"]/div[2]//button[text()="Book Now"]'); }
  get firstHotelRoomPrice () { return $('//div[@class="room-item-wrapper"]/div[2]//span[contains(@class, "number")]'); }
  get hotelRoomPrice () { return $$('div > div:nth-child(2) > div > div:nth-child(2) > p > span'); }

  get hotelDetails () { return $('div[class="hotel_details_panel__checkout"]')}
  get hotelCheckInDate () { return $('div[class="hotel_details_panel__checkout"] > ul > li:first-child > span'); }
  get hotelCheckOutDate () { return $('div[class="hotel_details_panel__checkout"] > ul > li:nth-child(2) > span'); }
  get hotelPriceCheck () { return $('div[class="o1"] > strong'); }

  get bookingForm () { return $('form[name="bookingForm"]'); }
  get bookingFirstNameInputField () { return $('input[name="first_name"]'); }
  get bookingLastNameInputField () { return $('input[name="last_name"]'); }
  get bookingMobileInputField () { return $('input[name="number"]'); }
  get bookingEmailInputField () { return $('div[class="form-group row"] > div > input[name="email"]'); }
  get countrySelectionDropdown () { return $('a[class="chosen-single"]'); }
  get countrySearchBox () { return $('input[class="chosen-search-input"]'); }
  get countrySearcResult () { return $('ul[class="chosen-results"] > li:first-child'); }

  get completeBookingButton () { return $('//button[text()="Complete Booking"]'); }

  get purchaseBookingPage () { return $('div[data-testid="protrudingHeader"]'); }
}

export default new BookingPage();
