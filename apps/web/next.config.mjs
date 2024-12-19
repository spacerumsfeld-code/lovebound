const nextConfig = {
    rewrites: async () => {
        return [
            {
                source: "/api/posthog/static/:path*",
                destination: "https://us-assets.i.posthog.com/static/:path*",
            },
            {
                source: "/api/posthog/:path*",
                destination: "https://us.i.posthog.com/:path*",
            },
            {
                source: "/api/posthog/decide",
                destination: "https://us.i.posthog.com/decide",
            },
        ];
    },
    skipTrailingSlashRedirect: true,
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.sanity.io',
            },
        ],
    },
}

export default nextConfig
