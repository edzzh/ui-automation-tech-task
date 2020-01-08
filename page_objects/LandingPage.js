import Page from './Page'

class LandingPage extends Page {
  constructor() {
    super();
  }

  /*
    Initial Page Elements
   */

  get currencyDropdownButton () { return $('div[class="dropdown dropdown-currency"] > a[id="dropdownCurrency"]'); }
  get languageDropdownButton () { return $('div[class="dropdown dropdown-language"] > a[id="dropdownLangauge"]'); }
  get landingPageLogo () { return $('div[class="imagelogo"]'); }
  get languageDropdown () { return $('div[aria-labelledby="dropdownLangauge"] > div[class="dropdown-menu-inner"]'); }
  get currencyDropdown () { return $('div[aria-labelledby="dropdownCurrency"] > div[class="dropdown-menu-inner"]'); }
  get activeLanguageAnchor () { return $('div[class="dropdown dropdown-language"] > a'); }
  get activeCurrencyAnchor () { return $('div[class="dropdown dropdown-currency"] > a'); }
  get myAccountButton () { return $('div[class="dropdown dropdown-login dropdown-tab"] > a'); }
  get myAccountDropdown () { return $('div[class="dropdown dropdown-login dropdown-tab show"]'); }
  get featuredToursFigureCurrencyCheck () { return $('(//figure//span//span)[1]'); }
  get homePageButton () { return $('nav[class*="main-nav-menu main-menu-nav"] > ul > li > a[title="home"]'); }
  get disableCookies () { return $('button[class="cc-btn cc-dismiss"]'); }

  open() {
    super.open('https://www.phptravels.net/index.php');
  }
}

export default new LandingPage();
