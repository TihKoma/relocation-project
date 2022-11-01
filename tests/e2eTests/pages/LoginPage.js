const param = require('../app/appParams')

module.exports = class LoginPage {
  constructor() {
    this.phoneFieldSelector = '[name="phone"]'
    this.getConfirmationCodeButtonSelector =
      '[data-test-id="auth-modal:send-code-button"]'
    this.phoneCodeSelector = '[name="code"]'
    this.confirmCodeButtonSelector =
      '[data-test-id="auth-modal:confirm-code-button"]'
  }

  async setPhoneNumber() {
    await param.browser
      .$(this.phoneFieldSelector)
      .waitForExist({timeout: param.defaultExplicitWait})
    const phoneNumberText = await param.browser.$(this.phoneFieldSelector)
    await phoneNumberText.clearValue()

    // there is an issue with cursor position focus during quick typing
    // (can't reproduce manually) keeping hardcoded for now
    await phoneNumberText.setValue('7999999999')
    await phoneNumberText.click()
    await phoneNumberText.addValue('0')
  }

  async getConfirmationCodeButtonClick() {
    await param.browser.$(this.getConfirmationCodeButtonSelector).click()
  }

  async setPhoneCode() {
    // temporary hardcoded value
    await param.browser.$(this.phoneCodeSelector).setValue('000001')
  }

  async confirmCodeButtonClick() {
    await param.browser.$(this.confirmCodeButtonSelector).click()
  }
}
