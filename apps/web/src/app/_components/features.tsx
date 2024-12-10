import { cn } from '../../lib/utils'

export const Features = () => {
    const features = [
        {
            title: 'Creative Freedom at Your Fingertips',
            description:
                'Craft stories with customizable settings, tones, characters, and themes that suit your mood and desires.',
            icon: '🖋️',
        },
        {
            title: 'Full Ownership',
            description:
                'Every story you generate is yours. Share it, save it, or turn it into something greater. You own your words, your fantasies, and your creations.',
            icon: '📜',
        },
        {
            title: 'Infinite Variety',
            description:
                'Choose from countless themes, settings, and genres to create tales that span from lighthearted romance to the steamiest encounters.',
            icon: ' 🎨',
        },
        {
            title: 'Diverse Representation',
            description:
                'Stories for everyone. Celebrate underrepresented groups and diverse characters in tales that feel authentic and meaningful to you.',
            icon: '🌍',
        },
        {
            title: 'Easy and Intuitive',
            description:
                "Customize your dream story in minutes, whether you're a seasoned writer or just want a good read.",
            icon: '🌟',
        },
        {
            title: 'A Story for Every Mood',
            description:
                "Whether you're craving romance, adventure, or mystery, tailor your story to match your feelings. Let your imagination run wild.",
            icon: '💭',
        },
        {
            title: 'Privacy Guaranteed',
            description:
                'Your fantasies are safe with us. We ensure your stories are private and stored securely for your eyes only.',
            icon: '🔒',
        },
        {
            title: 'Constantly Growing',
            description:
                'Add more characters, scenarios, genres, and settings to your stories. We are always adding new features to make your experience even better.',
            icon: '❤️',
        },
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-7xl mx-auto">
            {features.map((feature, index) => (
                <Feature key={feature.title} {...feature} index={index} />
            ))}
        </div>
    )
}

export const Feature = ({
    title,
    description,
    icon,
    index,
}: {
    title: string
    description: string
    icon: React.ReactNode
    index: number
}) => {
    return (
        <div
            className={cn(
                'flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800',
                (index === 0 || index === 4) &&
                    'lg:border-l dark:border-neutral-800',
                index < 4 && 'lg:border-b dark:border-neutral-800',
            )}
        >
            {index < 4 && (
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
            )}
            {index >= 4 && (
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
            )}
            <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
                {icon}
            </div>
            <div className="text-lg font-bold mb-2 relative z-10 px-10">
                <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
                <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
                    {title}
                </span>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
                {description}
            </p>
        </div>
    )
}
