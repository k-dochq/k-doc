import { withSentryConfig } from '@sentry/nextjs';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 개발 환경에서 최대한 자세한 로깅 활성화
  logging: {
    // fetch 요청 로깅 설정
    fetches: {
      fullUrl: true, // 전체 URL 로깅
      hmrRefreshes: true, // HMR 캐시에서 복원된 fetch도 로깅
    },
    // 들어오는 요청 로깅 (개발 환경에서만)
    incomingRequests: true, // 모든 요청 로깅
  },

  // 프로덕션에서도 소스맵 생성 (디버깅용)
  productionBrowserSourceMaps: true,

  // React Strict Mode 활성화 (개발 시 더 많은 경고)
  reactStrictMode: true,

  // 실험적 기능들 (더 자세한 로깅을 위해)
  experimental: {
    // 서버 컴포넌트 HMR 캐시 활성화
    serverComponentsHmrCache: true,
  },

  images: {
    // 이미지 최적화 비활성화
    // unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'hmzwblmwusrxbyqcvtlu.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: 'k-doc',

  project: 'javascript-nextjs',

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  // tunnelRoute: "/monitoring",

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
});
