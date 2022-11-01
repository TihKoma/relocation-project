'use strict'

module.exports = ['HeaderPage', 'LoginPage', 'UserProfilePage'].map((page) =>
  require(`./${page}`)
)
