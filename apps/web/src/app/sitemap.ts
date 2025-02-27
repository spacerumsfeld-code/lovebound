import type { MetadataRoute } from 'next'

if (!process.env.WEB_URL) throw new Error(`❌ no web_url env var in sitemap.ts`)

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: `${process.env.WEB_URL}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${process.env.WEB_URL}/login`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${process.env.WEB_URL}/info/terms-of-service`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${process.env.WEB_URL}/info/privacy-policy`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
    ]
}
