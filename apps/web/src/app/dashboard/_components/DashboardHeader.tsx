import { ArrowRight, Circle } from 'lucide-react'
import { Header } from 'src/components/ui/header'
import Link from 'next/link'
import { SITE_MAP } from 'src/constants'

const gettingStartedLinks = [
    {
        title: 'Create your first story',
        description: 'Choose your genre, theme and start writing',
        href: SITE_MAP.CREATE,
    },
    {
        title: 'Visit your Stories page',
        description: 'Read and manage your created stories',
        href: SITE_MAP.STORIES,
    },
    {
        title: 'Explore the Shop',
        description: 'Discover new themes, settings and more',
        href: SITE_MAP.SHOP,
    },
    {
        title: 'Top up your credits',
        description: 'Get credits to create more stories',
        href: SITE_MAP.UPGRADE,
    },
]

export const DashboardHeader = () => {
    // *Render
    return (
        <Header
            title="Welcome to Lovebound"
            description="Your journey into AI-powered storytelling begins here. Get started with these simple steps:"
        >
            <div className="grid sm:grid-cols-2 gap-4 mt-6">
                {gettingStartedLinks.map((link, index) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="group p-4 border rounded-lg hover:bg-purple-50 transition-colors relative"
                    >
                        <div className="flex items-center gap-4">
                            <div className="flex-shrink-0">
                                <Circle className="h-5 w-5 text-gray-300 stroke-2" />
                            </div>
                            <div className="flex-grow">
                                <h3 className="font-medium text-gray-900 dark:text-gray-100">
                                    {link.title}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {link.description}
                                </p>
                            </div>
                            <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                        </div>
                    </Link>
                ))}
            </div>
        </Header>
    )
}
