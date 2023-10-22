/** @type {import('next').NextConfig} */
/*const nextConfig = {
    output:'export',
    eslint: {ignoreDuringBuilds: false},
}

module.exports = nextConfig*/
const withPWA = require("@ducanh2912/next-pwa").default({
    dest: "public",
  });
  
  module.exports = withPWA({
    // Your Next.js config
    eslint: {ignoreDuringBuilds: false},
  });
