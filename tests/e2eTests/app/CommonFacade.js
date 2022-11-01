const param = require('./appParams')
const HeaderPage = require('../pages/HeaderPage')
const LoginPage = require('../pages/LoginPage')

const headerPage = new HeaderPage()
const loginPage = new LoginPage()

module.exports = class CommonFacade {
  constructor() {}

  async doLogin({phoneNumber}) {
    await param.browser.url(param.appUrl)
    await headerPage.signUpButtonClick()

    await loginPage.setPhoneNumber(phoneNumber)
    await loginPage.getConfirmationCodeButtonClick()
    await loginPage.setPhoneCode()
    await loginPage.confirmCodeButtonClick()
  }
}
