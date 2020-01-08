import Page from './Page'

class SignUpPage extends Page {
  constructor() {
    super();
  }

  /*
    Initial Page Elements
   */

  get signUpForm () { return $('div[class="collapse-item"]'); }
  get firstNameInput () { return $('input[name="firstname"]'); }
  get lastNameInput () { return $('input[name="lastname"]'); }
  get mobileNumberInput () { return $('input[name="phone"]'); }
  get emailInput () { return $('input[name="email"]'); }
  get passwordInput () { return $('input[name="password"]'); }
  get confirmPasswordInput () { return $('input[name="confirmpassword"]'); }
  get signUpButton () { return $('div[id="login"] > form > div > button'); }

}

export default new SignUpPage();
