const browserstack = require('browserstack-local')

if (
  process.env.NEXT_PUBLIC_MOBILE_BROWSERSTACK === 'true' ||
  process.env.BROWSERSTACK === 'true'
) {
  const browserstackLocal = new browserstack.Local()

  browserstackLocal.start(
    {
      key: process.env.BROWSERSTACK_KEY,
      force: true,
      verbose: true,
      logFile: '.browserstack/logs.txt',
    },
    () => {
      // eslint-disable-next-line no-console
      console.log('Started BrowserStackLocal')
    },
  )

  process.on('exit', () => {
    browserstackLocal.stop(() => {
      // eslint-disable-next-line no-console
      console.log('Stopped BrowserStackLocal')
    })
  })
}
