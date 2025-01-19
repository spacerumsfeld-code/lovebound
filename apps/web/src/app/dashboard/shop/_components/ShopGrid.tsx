import { Suspense } from 'react'
import { ShopGridAsync } from './ShopGrid.async'
import { ShopGridSkeleton } from './ShopGrid.skeleton'
import { ItemTypeEnum } from '@client-types/item/item.model'
import { ShopHeader } from './ShopHeader'

export const ShopGrid = ({
    args,
}: {
    args: {
        type: ItemTypeEnum
        limit: number
        offset: number
    }
}) => {
    // *Render
    return (
        <main>
            <ShopHeader type={args.type} />
            <Suspense fallback={<ShopGridSkeleton size={12} />}>
                <ShopGridAsync args={args} />
            </Suspense>
        </main>
    )
}
