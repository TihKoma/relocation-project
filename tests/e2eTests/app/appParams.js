require('dotenv/config')

const appParams = {}

if (!process.env.ENV_NAME) {
  throw `process.env.ENV_NAME is not defined`
}

const ENV_NAME = process.env.ENV_NAME

appParams.appUrl = `https://${ENV_NAME}.ci.nicity.io/`
console.log(`The current env = ${ENV_NAME}`)

appParams.defaultAuthPhone = process.env.AUTH_PHONE
appParams.defaultAuthCode = process.env.AUTH_CODE

appParams.defaultExplicitWait = 20000

module.exports = appParams
