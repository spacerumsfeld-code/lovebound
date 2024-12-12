import { Header } from 'src/components/ui/header'

export const ShopPage = () => {
    // @Render
    return (
        <main>
            <Header
                title="The Romance Shop"
                description="Purchase addons to enhance your love stories, including "
                ctaConfig={{
                    title: 'Browse Shop',
                    href: '/shop',
                }}
            />
        </main>
    )
}
