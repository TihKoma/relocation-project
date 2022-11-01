module.exports = function (api) {
  api.cache(true)

  const presets = ['next/babel', '@babel/preset-env']
  const plugins = [
    '@emotion',
    '@babel/plugin-transform-runtime',
    [
      '@babel/plugin-transform-react-jsx',
      {
        runtime: 'automatic',
        importSource: '@emotion/react',
      },
    ],
    [
      require.resolve('babel-plugin-named-asset-import'),
      {
        loaderMap: {
          svg: {
            ReactComponent: '@svgr/webpack?-svgo,+titleProp,+ref![path]',
          },
        },
      },
    ],
  ]

  return { plugins, presets }
}
