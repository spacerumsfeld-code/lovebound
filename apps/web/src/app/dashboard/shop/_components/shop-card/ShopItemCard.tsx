'use client'

import { Card } from '../../../../../components/ui/card'
import { cn } from '../../../../../lib/utils'
import { motion } from 'framer-motion'
import { ShopItemModal } from '../../../_components/modals/ShopItem.modal'
import { TItem } from '@client-types/item/item.model'
import { TypeLabel } from './TypeLabel'
import { OptimizedImage } from 'src/components/ui/image/optimized-image'
import { TitleLabel } from './TitleLabel'

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
                    <OptimizedImage
                        src={props.item.imageUrl}
                        alt={props.item.name}
                        height={400}
                        width={300}
                        className="h-full w-full object-cover"
                    />
                    <TitleLabel title={props.item.name} />
                    <TypeLabel type={props.item.type} />
                </Card>
            </motion.div>
        </ShopItemModal>
    )
}
