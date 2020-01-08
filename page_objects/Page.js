export default class Page {
    // Opens URL
    open(path) {
        browser.url(path);
    }
    // Check if element is displayed in HTML DOM
    isElementDisplayed(ele, errorMessage, timeout = 5000, reverse = false) {
        ele.waitForDisplayed(
            timeout,
            reverse,
            errorMessage
        );
    }
    // Check if element is not-displayed in HTML DOM
    isElementNotDisplayed(ele, errorMessage, timeout = 5000, reverse = true) {
        ele.waitForDisplayed(
            timeout,
            reverse,
            errorMessage
        );
    }
}
