import { Header } from 'src/components/ui/header'
import { SITE_MAP } from 'src/constants'
import { GettingStartedItem } from './GettingStartedItem'

export enum LinkEnum {
    GettingStarted = 'gettingStartedCreateStory',
    ExploreShop = 'gettingStartedShop',
    TopUpCredits = 'gettingStartedTopUp',
    GetFirstAddon = 'gettingStartedAddon',
    StartSubscription = 'gettingStartedSubscription',
}

const gettingStartedLinks = [
    {
        id: LinkEnum.GettingStarted,
        title: 'Create your first story',
        description: 'Create your first generative AI romance story!',
        href: SITE_MAP.CREATE,
    },
    {
        id: LinkEnum.ExploreShop,
        title: 'Explore the Shop',
        description: 'Discover new themes, settings, and tension levels.',
        href: SITE_MAP.SHOP,
    },
    {
        id: LinkEnum.TopUpCredits,
        title: 'Top up your credits',
        description: 'Get credits to create more stories.',
        href: SITE_MAP.UPGRADE,
    },
    {
        id: LinkEnum.GetFirstAddon,
        title: 'Get your first addon',
        description:
            'Get your first addon from the shop to enhance your storytelling.',
        href: SITE_MAP.SHOP,
    },
    {
        id: LinkEnum.StartSubscription,
        title: 'Start a subscription',
        description:
            'Start a subscription to save on credits and access more features.',
        href: SITE_MAP.SHOP,
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
                    <GettingStartedItem key={link.id} link={link} />
                ))}
            </div>
        </Header>
    )
}
