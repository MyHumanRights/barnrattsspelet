const withNextIntl = require('next-intl/plugin')()

/** @type {import('next').NextConfig} */
module.exports = withNextIntl({
  webpack(config) {
    config.module.rules.push(
      {
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        type: 'asset',
        generator: {
          filename: 'static/media/[name].[hash][ext]',
        },
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
