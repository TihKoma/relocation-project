const param = require('../app/appParams')

module.exports = class HeaderPage {
  constructor() {
    this.signUpButtonSelector = '[href="/login"]'
  }

  async signUpButtonClick() {
    await param.browser.$(this.signUpButtonSelector).click()
  }
}
