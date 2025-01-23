import { ArrowRight, CheckCircle, Circle } from 'lucide-react'
import { Header } from 'src/components/ui/header'
import Link from 'next/link'
import { SITE_MAP } from 'src/constants'
import { getGettingStartedFields } from '../data'

const gettingStartedLinks = [
    {
        id: 'gettingStartedCreateStory',
        title: 'Create your first story',
        description: 'Create your first generative AI romance story!',
        href: SITE_MAP.CREATE,
    },
    {
        id: 'gettingStartedShop',
        title: 'Explore the Shop',
        description: 'Discover new themes, settings, and tension levels.',
        href: SITE_MAP.SHOP,
    },
    {
        id: 'gettingStartedTopUp',
        title: 'Top up your credits',
        description: 'Get credits to create more stories.',
        href: SITE_MAP.UPGRADE,
    },
    {
        id: 'gettingStartedAddon',
        title: 'Get your first addon',
        description:
            'Get your first addon from the shop to enhance your storytelling.',
        href: SITE_MAP.SHOP,
    },
    {
        id: 'gettingStartedAddon',
        title: 'Get your first addon',
        description:
            'Get your first addon from the shop to enhance your storytelling.',
        href: SITE_MAP.SHOP,
    },
    {
        id: 'gettingStartedSubscription',
        title: 'Start a subscription',
        description:
            'Start a subscription to save on credits and access more features.',
        href: SITE_MAP.UPGRADE,
    },
]

export const DashboardHeader = async () => {
    // *Data
    const { gettingStartedFields } = await getGettingStartedFields()

    // *Render
    return (
        <Header
            title="Welcome to Lovebound"
            description="Your journey into AI-powered storytelling begins here. Get started with these simple steps:"
        >
            <div className="grid sm:grid-cols-2 gap-4 mt-6">
                {gettingStartedLinks.map((link, _index) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="group p-4 border rounded-lg hover:bg-purple-50 transition-colors relative"
                    >
                        <div className="flex items-center gap-4">
                            <div className="flex-shrink-0">
                                {gettingStartedFields[
                                    link.id as keyof typeof gettingStartedFields
                                ] ? (
                                    <CheckCircle
                                        className="h-5 w-5 text-green-300 stroke-2"
                                        strokeWidth={2}
                                    />
                                ) : (
                                    <Circle
                                        className="h-5 w-5 text-gray-300 stroke-2"
                                        strokeWidth={2}
                                    />
                                )}
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
