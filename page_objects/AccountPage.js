import Page from './Page'

class AccountPage extends Page {
  constructor() {
    super();
    this.firstName = null;
    this.lastName = null;
  }

  /*
    Initial Page Elements
   */

  get accountName () {
    return $(`//div[contains(@class, "row align-items-center")]//h3[text()="Hi, ${this.firstName} ${this.lastName}"]`);
  }
  get accountSideMenu () { return $('ul[class="menu-vertical-01"]'); }
  get myProfileButton () { return $('nav > ul[class="menu-vertical-01"] > li > a[href="#profile"]'); }
  get myProfileAccount () { return $('div[class="content-wrapper"] > h3'); }
  get myProfileFirstNameInput () { return $('input[name="firstname"]'); }
  get myProfileLastNameInput () { return $('input[name="lastname"]'); }
  get myProfileEmailInput () { return $('input[name="email"]'); }
  get myProfileMobileInput () { return $('input[name="phone"]'); }
  
  /*
    Initial Element Setters
   */
  
  setFirstName(name) {
    this.firstName = name;
  }

  setLastName(lastName) {
    this.lastName = lastName;
  }
}

export default new AccountPage();
