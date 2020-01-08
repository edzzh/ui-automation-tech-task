import { Given, When, Then } from "cucumber";
import landingPage from "../page_objects/LandingPage";
import signUpPage from "../page_objects/SignUpPage";
import accountPage from "../page_objects/AccountPage";
import loginPage from "../page_objects/LoginPage";

Given(/^I am on landing page of PHPTRAVELS$/, () => {
  landingPage.open();
  landingPage.landingPageLogo.waitForDisplayed(
    10000,
    false,
    `Couldn't find Landing Page logo`
  );

  if (landingPage.disableCookies.isDisplayed()) {
    landingPage.disableCookies.click();
  }
});

Then(/^I setup language property as "([^"]*)"$/, (languageValue) => {
  if (landingPage.activeLanguageAnchor.getText() !== languageValue.toUpperCase()) {
    landingPage.languageDropdownButton.click();
    landingPage.languageDropdown.waitForDisplayed(
      5000,
      false,
      `Couldn't find Lanugage Dropdown menu`
    );

    landingPage.languageDropdown.$$('a').map(language => {
      if (language.getText() === languageValue) {
        language.click();
      }
    });

    landingPage.activeLanguageAnchor.waitForDisplayed(
      10000,
      false,
      `Couldn't find active language anchor`
    );

    assert.strictEqual(
      landingPage.activeLanguageAnchor.getText(),
      languageValue.toUpperCase()
    );
  }
});

Then(/^setup currency property as "([^"]*)"$/, (currencyValue) => {
  if (landingPage.activeCurrencyAnchor.getText() !== currencyValue) {
    landingPage.currencyDropdownButton.click();
    landingPage.currencyDropdown.waitForDisplayed(
      5000,
      false,
      `Couldn't find Currency Dropdown menu`
    );

    landingPage.currencyDropdown.$$('a').map(currency => {
      if (currency.getText() === currencyValue) {
        currency.click();
      }
    });

    browser.waitUntil(() => {
      return landingPage.featuredToursFigureCurrencyCheck.getText().includes("€");
    }, 5000, `Tours is not converted in ${currencyValue}`);
  }
});

Given(/^I am in Sign Up page$/, () => {
  landingPage.myAccountButton.click();
  landingPage.myAccountDropdown.waitForDisplayed(
    5000,
    false,
    `Couldn't find My Account dropdown`
  );

  landingPage.myAccountDropdown.$('div').$$('a').map(accountAction => {
    if (accountAction.getText() === 'Sign Up') {
      accountAction.click();
    }
  });

  signUpPage.signUpForm.waitForDisplayed(
    5000,
    false,
    `Couldn't find Register panel`
  );
});

Given(/^I have account created$/, () => {
  landingPage.myAccountButton.waitForDisplayed(
    5000,
    false,
    `Couldn't find MY ACCOUNT button`
  );

  landingPage.myAccountButton.click();
  loginPage.loginButton.click();

  loginPage.loginForm.waitForDisplayed(
    5000,
    false,
    `Couldn't fin Login Form`
  );

  loginPage.loginEmailInputField.setValue(email);
  loginPage.loginPasswordInputField.setValue(password);
  loginPage.loginUserButton.click();

  accountPage.setFirstName(firstName);
  accountPage.setLastName(lastName);
  accountPage.accountName.waitForDisplayed(
    5000,
    false,
    `Couldn't find account name field`
  );
});

Given(/^I am in "Home" page$/, () => {
  landingPage.homePageButton.waitForDisplayed(
    5000,
    false,
    `Couldn't find "Home" page button`
  );

  landingPage.homePageButton.click();
  landingPage.landingPageLogo.waitForDisplayed(
    7000,
    false,
    `Couldn't find Landing Page logo`
  );
});
