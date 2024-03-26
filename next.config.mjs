/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  compiler: {
    styledComponents: {
      ssr: true,
      displayName: true,
      pure: true,
    },
  },
};

export default nextConfig;
