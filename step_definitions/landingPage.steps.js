import { Given, When, Then } from "cucumber";
import landingPage from "../page_objects/LandingPage";
import signUpPage from "../page_objects/SignUpPage";
import accountPage from "../page_objects/AccountPage";
import loginPage from "../page_objects/LoginPage";
import assert from "assert";

Given(/^I am on landing page of PHPTRAVELS$/, () => {
  landingPage.open();
  landingPage.landingPageLogo.waitForDisplayed(
    10000,
    false,
    `Landing Page Logo is not diplayed`
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
      `Lanugage Dropdown Menu is not diplayed`
    );

    // Select given lanugage
    landingPage.languageDropdown.$$('a').map(language => {
      if (language.getText() === languageValue) {
        language.click();
      }
    });

    landingPage.activeLanguageAnchor.waitForDisplayed(
      10000,
      false,
      `Active Language Anchor is not diplayed`
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
      `Currency Dropdown Menu is not diplayed`
    );

    // Select given currency
    landingPage.currencyDropdown.$$('a').map(currency => {
      if (currency.getText() === currencyValue) {
        currency.click();
      }
    });

    const currencyLabel = {
      EUR: "€",
      USD: "$"
    };

    browser.waitUntil(() => {
      return landingPage.featuredToursFigureCurrencyCheck.getText().includes(currencyLabel[currencyValue.toUpperCase()]);
    }, 5000, `Tours is not converted in ${currencyValue}`);
  }
});

Given(/^I am in Sign Up page$/, () => {
  landingPage.myAccountButton.click();
  landingPage.myAccountDropdown.waitForDisplayed(
    5000,
    false,
    `My Account Dropdow is not displayed`
  );

  // Select button equal to "Sign Up"
  landingPage.myAccountDropdown.$('div').$$('a').map(accountAction => {
    if (accountAction.getText() === 'Sign Up') {
      accountAction.click();
    }
  });

  signUpPage.signUpForm.waitForDisplayed(
    5000,
    false,
    `Register Panel is not displayed`
  );
});

Given(/^I have account created$/, () => {
  landingPage.myAccountButton.waitForDisplayed(
    5000,
    false,
    `MY ACCOUNT Button is not displayed`
  );

  landingPage.myAccountButton.click();

  landingPage.myAccountDropdown.waitForDisplayed(
    5000,
    false,
    `My Account Dropdow is not displayed`
  );

  loginPage.loginButton.click();

  loginPage.loginForm.waitForDisplayed(
    5000,
    false,
    `Login Form is not displayed`
  );

  // Login with give demo test profile
  loginPage.loginEmailInputField.setValue("user@phptravels.com");
  loginPage.loginPasswordInputField.setValue("demouser");
  loginPage.loginUserButton.click();

  accountPage.setFirstName("Demo");
  accountPage.setLastName("User");
  accountPage.accountName.waitForDisplayed(
    10000,
    false,
    `Profile Name - Demo User is not displayed`
  );
});

Given(/^I am in "Home" page$/, () => {
  landingPage.homePageButton.waitForDisplayed(
    5000,
    false,
    `"Home" Page Button is not displayed`
  );

  landingPage.homePageButton.click();
  landingPage.landingPageLogo.waitForDisplayed(
    7000,
    false,
    `Landing Page Logo is not displayed`
  );
});
