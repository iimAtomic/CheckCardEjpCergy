/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/index.html",
        destination: "/",
        permanent: true
      },
      {
        source: "/card.html",
        destination: "/card",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
