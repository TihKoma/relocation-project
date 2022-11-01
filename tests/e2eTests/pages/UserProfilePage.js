const param = require('../app/appParams')

module.exports = class UserProfilePage {
  constructor() {}

  async isUserFullNameVisible({userFullName}) {
    // text `h1=${userFullName}` should be replaced by data-test-id
    await param.browser
      .$(`h1=${userFullName}`)
      .waitForExist({timeout: param.defaultExplicitWait})
    const userFullNameElement = await param.browser.$(`h1=${userFullName}`)

    return userFullNameElement.isDisplayed()
  }
}
