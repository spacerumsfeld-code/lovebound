import { cn } from '../../lib/utils'

const differentiators = [
    {
        title: 'Creative Freedom at Your Fingertips',
        description:
            'Choose from a wide and expanding range of options to craft your stories.',
        icon: '🖋️',
    },
    {
        title: 'Full Ownership',
        description:
            'Every story you generate is yours. Share it, save it, or turn it into something greater.',
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
        title: 'Intuitive',
        description:
            'No need to write. Just choose your options from the menu and let the magic happen.',
        icon: '🌟',
    },
    {
        title: 'A Story for Every Mood',
        description: 'Let your imagination run wild.',
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
            'We are always adding new features and value your feedback. Help us make this the best story generator for you.',
        icon: '❤️',
    },
]

export const Differentiators = () => {
    return (
        <div className="w-full relative py-16 mx-auto">
            <div id="differentiators">
                <h4 className="text-gray-700 text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium">
                    An ever-expanding list of features that empower you to
                    create.
                </h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
                {differentiators.map((feature, index) => (
                    <DifferentiatorItem
                        key={feature.title}
                        {...feature}
                        index={index}
                    />
                ))}
            </div>
        </div>
    )
}

export const DifferentiatorItem = ({
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
                <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-indigo-400 transition-all duration-200 origin-center" />
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
