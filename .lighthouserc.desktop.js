module.exports = {
  ci: {
    collect: {
      numberOfRuns: 1,
      settings: {
        chromeFlags:
          '--disable-gpu --headless --no-zygote --no-sandbox --disable-dev-shm-usage',
        preset: 'desktop',
      },
    },
    assert: {
      preset: 'lighthouse:recommended',
    },
    upload: {
      target: 'lhci',
      serverBaseUrl: 'https://lhci.nicity.io',
      token: 'e80e0e59-e6fa-4919-853e-4147fbf5ce8d',
    },
  },
}
