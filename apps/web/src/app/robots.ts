import type { MetadataRoute } from 'next'

if (!process.env.WEB_URL) throw new Error(`❌ no web_url env var in robots.ts`)

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/dashboard/', '/dashboard/*'],
        },
        sitemap: `${process.env.WEB_URL}/sitemap.xml`,
    }
}
