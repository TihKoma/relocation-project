const assert = require('assert')
const CommonFacade = require('../../app/CommonFacade')
const UserProfilePage = require('../../pages/UserProfilePage')

require('../../hooks')

const userProfilePage = new UserProfilePage()
const commonFacade = new CommonFacade()

describe('Auth', async function () {
  it('QA-TC-36_Login', async function () {
    await commonFacade.doLogin({})

    assert.ok(
      await userProfilePage.isUserFullNameVisible({userFullName: 'Test0 Test0'})
    )
  })
})
