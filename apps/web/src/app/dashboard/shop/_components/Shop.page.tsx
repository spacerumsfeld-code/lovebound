import { Suspense } from 'react'
import { Header } from 'src/components/ui/header'
import { ShopGrid } from './ShopGrid'

export const ShopPage = () => {
    // @Render
    return (
        <main>
            <Header
                title="The Romance Shop"
                description="Purchase addons to enhance your love stories"
                ctaConfig={{
                    title: 'Browse Shop',
                    href: '/shop',
                }}
            />
            <Suspense fallback={'Loading'}>
                <ShopGrid />
            </Suspense>
        </main>
    )
}
