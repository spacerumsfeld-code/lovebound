import { withSentryConfig } from "@sentry/nextjs";
import { Resource } from 'sst'

const nextConfig = {
    rewrites: async () => {
        return [
            {
                source: "/monitoring/:path*",
                destination: "/monitoring/:path*",
            },
            {
                source: "/api/posthog/e",
                destination: "https://us.i.posthog.com/e",
            },
            {
                source: "/api/posthog/decide",
                destination: "https://us.i.posthog.com/decide",
            },
            {
                source: "/api/posthog/engage",
                destination: "https://us.i.posthog.com/engage",
            },
            {
                source: "/api/posthog/s",
                destination: "https://us.i.posthog.com/s",
            },
            {
                source: "/api/posthog/static/:path*",
                destination: "https://us-assets.i.posthog.com/static/:path*",
            }
        ]
    },
    skipTrailingSlashRedirect: true,
    reactStrictMode: false,
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.sanity.io',
            },
            {
                protocol: 'https',
                hostname: 'api.producthunt.com'
            },
            {
                protocol: 'https',
                hostname: `${Resource.Bucket.name}.s3.amazonaws.com`,
            }
        ],
    },
}

export default withSentryConfig(nextConfig, {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    org: "lovebound",
    project: "javascript-nextjs",

    // Only print logs for uploading source maps in CI
    silent: !process.env.CI,

    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
    // This can increase your server load as well as your hosting bill.
    // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
    // side errors will fail.
    tunnelRoute: "/monitoring",

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,
});