import { ArrowRight, CheckCircle, Circle } from 'lucide-react'
import { Header } from 'src/components/ui/header'
import { SITE_MAP } from 'src/constants'
import { HeaderItem } from './HeaderItem'

export enum GettingStartedLinkId {
    CreateStory = 'gettingStartedCreateStory',
    Shop = 'gettingStartedExploreShop',
    TopUp = 'gettingStartedTopUpCredits',
    Addon = 'gettingStartedAddon',
    Subscription = 'gettingStartedSubscription',
}

const gettingStartedLinks = [
    {
        id: GettingStartedLinkId.CreateStory,
        title: 'Create your first story',
        description: 'Create your first generative AI romance story!',
        href: SITE_MAP.CREATE,
    },
    {
        id: GettingStartedLinkId.Shop,
        title: 'Explore the Shop',
        description: 'Discover new themes, settings, and tension levels.',
        href: SITE_MAP.SHOP,
    },
    {
        id: GettingStartedLinkId.TopUp,
        title: 'Top up your credits',
        description: 'Get credits to create more stories.',
        href: SITE_MAP.UPGRADE,
    },
    {
        id: GettingStartedLinkId.Addon,
        title: 'Get your first addon',
        description:
            'Get your first addon from the shop to enhance your storytelling.',
        href: SITE_MAP.SHOP,
    },
    {
        id: GettingStartedLinkId.Subscription,
        title: 'Start a subscription',
        description:
            'Start a subscription to save on credits and access more features.',
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
                {gettingStartedLinks.map((link, _index) => (
                    <HeaderItem key={link.id} link={link} />
                ))}
            </div>
        </Header>
    )
}
