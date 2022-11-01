const param = require('./app/appParams')
const {remote} = require('webdriverio')

beforeEach(async function () {
  param.browser = await remote({
    capabilities: {
      browserName: 'chrome'
    }
  })
})

afterEach(async function () {
  await param.browser.deleteSession()
})
