module.exports = {
  ci: {
    collect: {
      numberOfRuns: 1,
      settings: {
        chromeFlags:
          '--disable-gpu --headless --no-zygote --no-sandbox --disable-dev-shm-usage',
      },
    },
    assert: {
      preset: 'lighthouse:recommended',
    },
    upload: {
      target: 'lhci',
      serverBaseUrl: 'https://lhci.nicity.io',
      token: '212ae61e-04c2-48a1-ac50-901e682fafd2',
    },
  },
}
