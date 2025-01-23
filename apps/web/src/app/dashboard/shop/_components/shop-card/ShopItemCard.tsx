'use client'

import { Card } from '../../../../../components/ui/card'
import { cn } from '../../../../../lib/utils'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ShopItemModal } from '../../../_components/modals/ShopItem.modal'
import { TItem } from '@client-types/item/item.model'
import { TypeLabel } from './TypeLabel'

export const ShopItemCard = (props: {
    item: Omit<TItem, 'createdAt' | 'updatedAt' | 'isDefault'>
    creditCount: number
}) => {
    // @Render
    return (
        <ShopItemModal item={props.item} creditCount={props.creditCount}>
            <motion.div
                whileHover={{ scale: 1.02 }}
                className={cn(
                    'h-[400px] w-[300px] relative group cursor-pointer',
                )}
            >
                <Card className="h-[400px] w-[300px] relative overflow-hidden rounded-2xl">
                    <Image
                        src={props.item.imageUrl}
                        alt={props.item.name}
                        height={400}
                        width={300}
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute bottom-0 p-4 text-white">
                        <h3 className="text-xl text-white font-semibold mb-2">
                            {props.item.name}
                        </h3>
                    </div>
                    <TypeLabel type={props.item.type} />
                </Card>
            </motion.div>
        </ShopItemModal>
    )
}
