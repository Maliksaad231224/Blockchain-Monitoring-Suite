/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    // Only expose public environment variables to the client
    // API keys should remain server-side only
  },
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: [
        '**/node_modules',
        '**/.git',
        '**/C:/pagefile.sys',
        '**/C:/hiberfil.sys',
        '**/C:/swapfile.sys',
        '**/C:/DumpStack.log.tmp',
      ],
    }
    return config
  },
}

module.exports = nextConfig
