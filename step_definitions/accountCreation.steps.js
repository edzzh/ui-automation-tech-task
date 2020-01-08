import { Given, When, Then } from "cucumber";
import uuid from "uuid/v4";
import assert from "assert";
import signUpPage from '../page_objects/SignUpPage';
import accountPage from '../page_objects/AccountPage';

// Mock Test Data
const mockFirstName = `name-${uuid().substring(0,8)}`;
const mockLastName = `lastname-${uuid().substring(0,8)}`;
const mockEmail = `email-${uuid().substring(0,8)}@gmail.com`;
const mockMobile = Math.floor(Math.random() * 1000000000);

When(/^I valid user details in Register section$/, () => {
  signUpPage.firstNameInput.waitForDisplayed(
    5000,
    false,
    `Couldn't find First Name input`
  );

  signUpPage.firstNameInput.setValue(mockFirstName);

  signUpPage.lastNameInput.waitForDisplayed(
    5000,
    false,
    `Couldn't find Last Name input`
  );

  signUpPage.lastNameInput.setValue(mockLastName);

  signUpPage.mobileNumberInput.waitForDisplayed(
    5000,
    false,
    `Couldn't find Mobile Number input`
  );

  signUpPage.mobileNumberInput.setValue(mockMobile.toString());

  signUpPage.emailInput.waitForDisplayed(
    5000,
    false,
    `Couldn't find Email input`
  );

  signUpPage.emailInput.setValue(mockEmail);

  signUpPage.passwordInput.waitForDisplayed(
    5000,
    false,
    `Couldn't find Password input`
  );
  signUpPage.passwordInput.setValue("password123");

  signUpPage.confirmPasswordInput.waitForDisplayed(
    5000,
    false,
    `Couldn't find Confirm Password input`
  );
  signUpPage.confirmPasswordInput.setValue("password123");
});

When(/^click on “SIGN UP” button$/, () => {
  signUpPage.signUpButton.waitForDisplayed(
    5000,
    false,
    `Couldn't find Login Button`
  );

  signUpPage.signUpButton.click();
});

When(/^My Account page is opened$/, () => {
  accountPage.setFirstName(mockFirstName);
  accountPage.setLastName(mockLastName);
  accountPage.accountName.waitForDisplayed(
    5000,
    false,
    `Couldn't find account name field`
  );
});

When(/^I click on “MY PROFILE” button$/, () => {
  accountPage.accountSideMenu.waitForDisplayed(
  5000,
  false,
  `Couldn't find Account side menu`
  );

  accountPage.myProfileButton.click();
});

Then(/^“MY PROFILE” section is opened$/, () => {
  browser.waitUntil(() => {
    return accountPage.myProfileAccount.getText().includes("My Profile");
  }, 5000, `Couldn't find My Profile form`);
});

Then(/^correct personal information is displayed$/, () => {
  assert.strictEqual(accountPage.myProfileFirstNameInput.getValue(), mockFirstName);
  assert.strictEqual(accountPage.myProfileLastNameInput.getValue(), mockLastName);
  assert.strictEqual(accountPage.myProfileEmailInput.getValue(), mockEmail);
  assert.strictEqual(accountPage.myProfileMobileInput.getValue(), mockMobile.toString());
});
