import { useEffect, useState } from 'react'
import { SITE_MAP } from 'src/constants'
import { driver, type Driver } from 'driver.js'

import 'driver.js/dist/driver.css'

const configs = {
    [SITE_MAP.CREATE]: {
        showProgress: true,
        popoverClass:
            'rounded-lg border border-slate-200 bg-white p-6 text-slate-950 shadow-md',
        steps: [
            {
                element: '#tour-start',
                popover: {
                    title: 'Welcome to Lovebound!',
                    description:
                        'This tour will walk you through creating your first story.',
                },
            },
            {
                element: '#tour-title',
                popover: {
                    title: 'Title',
                    description: 'Name your story whatever you want!',
                },
            },
            {
                element: '#tour-genre',
                popover: {
                    title: 'Genre',
                    description: 'The overarching genre of your story.',
                },
            },
            {
                element: '#tour-length',
                popover: {
                    title: 'Length',
                    description:
                        'Mini stories are bite-sized bits of love, while a short story is three scenes, each of about 2000 words.',
                },
            },
            {
                element: '#tour-narration',
                popover: {
                    title: 'Audio Narration',
                    description:
                        'If you are a premium subscriber, you can add audio narration from one of the voice selections.',
                },
            },
            {
                element: '#tour-theme',
                popover: {
                    title: 'Theme',
                    description:
                        'The romantic trope, or theme, of your story. This will persist across scenes.',
                },
            },
            {
                element: '#tour-setting',
                popover: {
                    title: 'Setting(s)',
                    description:
                        'The settings for your scenes. Each scene has a unique setting, so be sure to specify a setting for each scene!',
                },
            },
            {
                element: '#tour-tone',
                popover: {
                    title: 'Tone(s)',
                    description:
                        'The tones for your scenes. Each scene has a unique tone, so be sure to specify one for each scene!',
                },
            },
            {
                element: '#tour-tension',
                popover: {
                    title: 'Tension Level(s)',
                    description:
                        'How spicy each of your scenes will be -- from tame to totally explicit. Each scene has a unique tension level, so be sure to specify one for each scene!',
                },
            },
            {
                element: '#tour-end',
                popover: {
                    title: 'Create your story.',
                    description:
                        'If you are happy with your selections, click here to create your story! You will be presented with a summary of the inputs you chose and can go back and edit them as needed.',
                },
            },
        ],
    },
}

export function useTour(page: SITE_MAP) {
    const [tourDriver, setTourDriver] = useState<Driver | null>(null)

    useEffect(() => {
        if (page === SITE_MAP.CREATE) {
            const result = driver(configs[SITE_MAP.CREATE])
            setTourDriver(result)
        }
    }, [page])

    return { startTour: () => tourDriver?.drive() }
}

export default useTour
