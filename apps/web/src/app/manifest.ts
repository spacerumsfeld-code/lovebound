import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Lovebound',
        short_name: 'Lovebound',
        description: 'Make your own romance stories with hundreds of inputs',
        start_url: '/',
        display: 'browser',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    }
}
