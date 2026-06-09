import type { NextConfig } from "next";

// GitHub Pages serves this project repo at https://vocso-com.github.io/naxsha.ai/,
// so the static export needs a basePath. Gated behind GITHUB_PAGES so local
// `next dev` keeps serving from the root path.
const isPages = process.env.GITHUB_PAGES === "true";
const repo = "naxsha.ai";

const nextConfig: NextConfig = isPages
  ? {
      output: "export",
      trailingSlash: true,
      basePath: `/${repo}`,
      assetPrefix: `/${repo}/`,
      images: { unoptimized: true },
    }
  : {};

export default nextConfig;
