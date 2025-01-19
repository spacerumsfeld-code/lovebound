import { Suspense } from 'react'
import { ShopGridAsync } from './ShopGrid.async'
import { ShopGridSkeleton } from './ShopGrid.skeleton'
import { Header } from 'src/components/ui/header'
import { ItemTypeEnum } from '@client-types/item/item.model'

const descriptionMap = new Map<ItemTypeEnum, string>([
    [
        ItemTypeEnum.None,
        'Expand your stories with more settings, genres, and themes',
    ],
    [ItemTypeEnum.Pack, 'Packs: Sets of items for your story'],
    [ItemTypeEnum.Genre, 'Genres: Romance, Comedy, Drama, etc.'],
    [ItemTypeEnum.Theme, 'Themes: Romance, Comedy, Drama, etc.'],
    [ItemTypeEnum.Length, 'Lengths: Romance, Comedy, Drama, etc.'],
    [ItemTypeEnum.Tone, 'Tones: Romance, Comedy, Drama, etc.'],
    [ItemTypeEnum.Setting, 'Settings: Romance, Comedy, Drama, etc.'],
    [ItemTypeEnum.TensionLevel, 'Tension Levels: Romance, Comedy, Drama, etc.'],
])

export const ShopGrid = ({
    args,
}: {
    args: {
        type: ItemTypeEnum
        limit: number
        offset: number
    }
}) => {
    // @State
    const headerCtaConfig = [
        {
            title: 'Themes',
            href: `/dashboard/shop?type=${ItemTypeEnum.Theme}`,
            active: Boolean(args.type === ItemTypeEnum.Theme),
        },
        {
            title: 'Lengths',
            href: `/dashboard/shop?type=${ItemTypeEnum.Length}`,
            active: Boolean(args.type === ItemTypeEnum.Length),
        },
        {
            title: 'Tones',
            href: `/dashboard/shop?type=${ItemTypeEnum.Tone}`,
            active: Boolean(args.type === ItemTypeEnum.Tone),
        },
        {
            title: 'Settings',
            href: `/dashboard/shop?type=${ItemTypeEnum.Setting}`,
            active: Boolean(args.type === ItemTypeEnum.Setting),
        },
        {
            title: 'Tension Levels',
            href: `/dashboard/shop?type=${ItemTypeEnum.TensionLevel}`,
            active: Boolean(args.type === ItemTypeEnum.TensionLevel),
        },
    ]

    // @Render
    return (
        <main>
            <Header
                title="The Romance Shop"
                description={descriptionMap.get(args.type)}
                ctaConfig={headerCtaConfig}
            />
            <Suspense fallback={<ShopGridSkeleton size={12} />}>
                <ShopGridAsync args={args} />
            </Suspense>
        </main>
    )
}
