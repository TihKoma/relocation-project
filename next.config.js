/** @type {import('next').NextConfig} */
require('./env')
require('./browserstack.js')
const { withSentryConfig } = require('@sentry/nextjs')
const StatoscopeWebpackPlugin = require('@statoscope/webpack-plugin').default
const { StatsWriterPlugin } = require('webpack-stats-plugin')

const isProduction = process.env.NODE_ENV === 'production'

let config = {
  // TODO: make true when react-spring-bottom-sheet update  react-spring to v9 https://github.com/stipsan/react-spring-bottom-sheet/issues/210
  reactStrictMode: false,
  experimental: {
    esmExternals: false, // TODO delete when next 12.1.17 https://github.com/vercel/next.js/issues/32314
  },
}

config.redirects = async () => {
  return [
    {
      source: '/',
      destination: '/dashboard',
      permanent: false,
    },
    {
      source: '/u',
      destination: '/',
      permanent: false,
    },
    {
      source: '/u/:userName/posts',
      destination: '/u/:userName',
      permanent: true,
    },
    {
      source: '/:regionSlug/homes/building',
      destination: '/:regionSlug/homes',
      permanent: true,
    },
    {
      source: '/post',
      destination: '/',
      permanent: false,
    },
    {
      source: '/tag',
      destination: '/',
      permanent: false,
    },
    {
      source: '/match/:path*',
      destination: '/where/:path*',
      permanent: false,
    },
  ]
}

const devRewrites = [
  {
    source: '/void/auth/:tail*',
    destination: `https://auth.pre-prod.ci.nicity.io/:tail*`,
  },
]

config.rewrites = async () => {
  return isProduction ? devRewrites : devRewrites
}

config.generateBuildId = async () => {
  const date = Date.now()
  return `${date}`
}

config.webpack = (config, { webpack, buildId, isServer }) => {
  // ad-hoc to x-ray
  config.resolve.fallback = { fs: false, dgram: false, async_hooks: false }
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env.NEXT_PUBLIC_BUILD_ID': JSON.stringify(buildId),
    }),
  )
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env.RUNTIME_ENV': JSON.stringify(
        isServer ? 'server' : 'browser',
      ),
    }),
  )
  if (process.env.ANALYZE === 'true') {
    config.plugins.push(new StatoscopeWebpackPlugin())
  }
  if (process.env.GENERATE_WEBPACK_STATS === 'true') {
    config.plugins.push(
      new StatsWriterPlugin({
        filename: '../webpack-stats.json',
        stats: {
          assets: true,
          entrypoints: true,
          chunks: true,
          modules: true,
        },
      }),
    )
  }
  return config
}

if (process.env.ANALYZE === 'true') {
  const withBundleAnalyzer = require('@next/bundle-analyzer')()

  config = withBundleAnalyzer(config)
}

if (isProduction && process.env.NEXT_PUBLIC_WITH_SENTRY === 'true') {
  const sentryWebpackPluginOptions = {
    // Additional config options for the Sentry Webpack plugin. Keep in mind that
    // the following options are set automatically, and overriding them is not
    // recommended:
    //   release, url, org, project, authToken, configFile, stripPrefix,
    //   urlPrefix, include, ignore
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options.
  }

  config = withSentryConfig(config, sentryWebpackPluginOptions)
}

module.exports = config
