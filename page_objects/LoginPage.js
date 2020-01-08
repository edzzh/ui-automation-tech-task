import Page from './Page';

class LoginPage extends Page{
  constructor() {
    super();
  }

  /*
    Initial Page Elements
   */

  get loginButton () { return $('//div[@class="dropdown dropdown-login dropdown-tab show"]//a[text()="Login"]'); }
  get loginForm () { return $('form[id="loginfrm"]'); }
  get loginEmailInputField () { return $('input[name="username"]'); }
  get loginPasswordInputField () { return $('input[name="password"]'); }
  get loginUserButton () { return $('//button[text()="Login"]'); }
}

export default new LoginPage();
