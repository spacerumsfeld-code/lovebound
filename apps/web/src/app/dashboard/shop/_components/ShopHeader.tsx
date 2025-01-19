import { ItemTypeEnum } from '@client-types/item/item.model'
import Link from 'next/link'
import { Button } from 'src/components/ui/button'
import { Header } from 'src/components/ui/header'
import { cn } from 'src/lib/utils'

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

export const ShopHeader = (props: { type: ItemTypeEnum }) => {
    // *State
    const filterOptions = [
        {
            title: 'Themes',
            href: `/dashboard/shop?type=${ItemTypeEnum.Theme}`,
            active: Boolean(props.type === ItemTypeEnum.Theme),
        },
        {
            title: 'Lengths',
            href: `/dashboard/shop?type=${ItemTypeEnum.Length}`,
            active: Boolean(props.type === ItemTypeEnum.Length),
        },
        {
            title: 'Tones',
            href: `/dashboard/shop?type=${ItemTypeEnum.Tone}`,
            active: Boolean(props.type === ItemTypeEnum.Tone),
        },
        {
            title: 'Settings',
            href: `/dashboard/shop?type=${ItemTypeEnum.Setting}`,
            active: Boolean(props.type === ItemTypeEnum.Setting),
        },
        {
            title: 'Tension Levels',
            href: `/dashboard/shop?type=${ItemTypeEnum.TensionLevel}`,
            active: Boolean(props.type === ItemTypeEnum.TensionLevel),
        },
    ]

    // *Render
    return (
        <Header
            title="Romance Shop"
            description={descriptionMap.get(props.type)}
        >
            {filterOptions.map((cta, index) => (
                <Button
                    variant="primary"
                    as={Link}
                    className={cn(
                        'from-transparent to-transparent',
                        cta.active
                            ? 'bg-indigo-400 hover:bg-indigo-300 active:bg-indigo-400'
                            : 'bg-indigo-300 hover:bg-indigo-200 active:bg-indigo-300',
                    )}
                    href={cta.href}
                    key={index}
                >
                    {cta.title}
                </Button>
            ))}
        </Header>
    )
}
