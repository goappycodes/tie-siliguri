import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Photography carries this site, so allow a higher-fidelity step than the
    // default 75 for hero and feature imagery.
    qualities: [75, 82],
  },
};

export default nextConfig;
