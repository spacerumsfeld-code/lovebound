import { ShopItemCard } from './ShopItemCard'
import React from 'react'
import { LoadMore } from './LoadMore'
import { TItem } from '@client-types/item/item.model'

export const ShopGridView = (props: {
    items: Partial<TItem>[]
    hasMore: boolean
    nextOffset: number
    creditCount: number
}) => {
    return (
        <>
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {props.items.map((item) => (
                    <ShopItemCard
                        key={item.id}
                        item={item}
                        creditCount={props.creditCount}
                    />
                ))}
            </div>
            {props.hasMore && <LoadMore nextOffset={props.nextOffset} />}
        </>
    )
}
