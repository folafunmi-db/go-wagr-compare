import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "/app/sw.ts",
  swDest: "public/sw.js",
});

export default withSerwist({
  // output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
});
