import Page from './Page';

class LoginPage extends Page{
  constructor() {
    super();
  }

  /*
    Initial Page Elements
   */

  get loginButton () { return $('a[href$="login"]'); }
  get loginForm () { return $('form[id="loginfrm"]'); }
  get loginEmailInputField () { return $('input[name="username"]'); }
  get loginPasswordInputField () { return $('input[name="password"]'); }
  get loginUserButton () { return $('//button[text()="Login"]'); }
}

export default new LoginPage();
