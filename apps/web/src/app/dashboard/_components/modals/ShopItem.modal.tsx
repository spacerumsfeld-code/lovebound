import { TItem } from '@client-types/item/item.model'
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalTrigger,
} from 'src/components/ui/animated-modal'
import { Button } from 'src/components/ui/button'
import { Badge } from 'src/components/ui/badge'
import { Loader2, ShoppingCart } from 'lucide-react'
import { Separator } from 'src/components/ui/separator'
import useLoading from 'src/hooks/use-loading'
import { useState } from 'react'
import { useToast } from 'src/hooks/use-toast'
import { purchaseItemFromShop } from '../../shop/server'
import Link from 'next/link'
import { OptimizedImage } from 'src/components/ui/image/optimized-image'

export const ShopItemModal = (props: {
    item: Omit<TItem, 'createdAt' | 'updatedAt' | 'isDefault'>
    creditCount: number
    children: React.ReactNode
}) => {
    // @State
    const { isLoading, startLoading, stopLoading } = useLoading()
    const [needMoreCredits, setNeedMoreCredits] = useState(false)

    // @Interactivity
    const { showToast } = useToast()

    const handleBuyNow = async () => {
        startLoading('purchaseItem')
        if (props.creditCount < props.item.cost) {
            showToast('You do not have enough credits to purchase this item')
            setNeedMoreCredits(true)
            stopLoading('purchaseItem')
            return
        }
        await purchaseItemFromShop({
            itemId: props.item.id,
            itemCost: props.item.cost,
        })
    }

    // @Render
    return (
        <Modal>
            <ModalTrigger>{props.children}</ModalTrigger>
            <ModalBody>
                <ModalContent>
                    <div className="flex flex-col gap-y-4 items-center justify-center">
                        <div className="text-lg font-bold text-center mb-8">
                            {props.item.name}
                        </div>
                        <OptimizedImage
                            src={props.item.imageUrl!}
                            alt={props.item.name}
                            height={400}
                            width={400}
                        />
                        <p className="text-sm sm:text-base text-muted-foreground">
                            {props.item.description}
                        </p>
                    </div>

                    <Separator />
                    <div className="flex justify-between items-center">
                        <Badge
                            variant="secondary"
                            className="text-lg font-semibold"
                        >
                            {props.item.cost} credit
                            {props.item.cost > 1 && 's'}
                        </Badge>
                        {needMoreCredits && (
                            <Badge
                                variant="secondary"
                                className="text-lg font-semibold bg-rose-400"
                            >
                                More Credits Needed
                            </Badge>
                        )}
                    </div>
                </ModalContent>
                <ModalFooter className="flex gap-4">
                    {needMoreCredits && (
                        <Button
                            variant="primary"
                            as={Link}
                            href="/dashboard/upgrade"
                            className="flex"
                        >
                            Buy Credits
                        </Button>
                    )}
                    <Button
                        variant="secondary"
                        disabled={isLoading('purchaseItem') || needMoreCredits}
                        className="flex items-center justify-center"
                        onClick={() => handleBuyNow()}
                    >
                        {isLoading('purchaseItem') ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <ShoppingCart className="mr-2 h-4 w-4" />
                        )}
                        Buy Now
                    </Button>
                </ModalFooter>
            </ModalBody>
        </Modal>
    )
}
