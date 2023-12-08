/** @type {import('next').NextConfig} */

const withNextIntl = require('next-intl/plugin')(
  // This is the default (also the `src` folder is supported out of the box)
  './i18n.ts'
)

module.exports = withNextIntl({
  webpack(config, options) {
    const { isServer } = options

    config.module.rules.push(
      {
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        exclude: config.exclude,
        use: [
          {
            loader: require.resolve('url-loader'),
            options: {
              limit: config.inlineImageLimit,
              fallback: require.resolve('file-loader'),
              publicPath: `${config.assetPrefix}/_next/static/images/`,
              outputPath: `${isServer ? '../' : ''}static/images/`,
              name: '[name]-[hash].[ext]',
              esModule: config.esModule || false,
            },
          },
        ],
      },
      {
        test: /\.svg$/i,
        use: ['@svgr/webpack'],
      }
    )

    return config
  },
  reactStrictMode: true,
  experimental: {
    webpackBuildWorker: true,
  },
})
