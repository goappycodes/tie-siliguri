import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Photography carries this site, so allow higher-fidelity steps than the
    // default 75 for hero and feature imagery. 90 is used for prominent photos
    // (program/partner features, galleries) to keep them crisp on retina.
    qualities: [75, 82, 90],
  },
};

export default nextConfig;
