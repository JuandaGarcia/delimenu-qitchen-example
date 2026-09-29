import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    // Delimenu already serves resized variants (512x512 logos, 1080x1080 photos)
    // from Firebase Storage with long cache headers, so there is nothing for the
    // Image Optimization API to do except spend its quota.
    unoptimized: true,
  },
}

export default nextConfig
