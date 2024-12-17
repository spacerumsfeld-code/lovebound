'use client'

import { ProductTypeEnum } from '@client-types/payment/payment.model'
import { createCheckoutSession } from '../data'
import { Button } from 'src/components/ui/button'
import { cn } from 'src/lib/utils'

export const PurchaseButton = (props: {
    product: ProductTypeEnum
    subscription?: boolean
    disabled?: boolean
}) => {
    // @Interactivity
    const handlePurchaseProduct = async (productType: ProductTypeEnum) => {
        if (props.disabled) return
        createCheckoutSession({
            productType,
        })
    }

    // @Render
    return (
        <Button
            className={cn(
                props.disabled
                    ? 'bg-slate-200 text-black'
                    : 'bg-indigo-400 text-white',
            )}
            onClick={() => handlePurchaseProduct(props.product)}
        >
            {props.subscription ? 'Subscribe' : 'Buy Now'}
        </Button>
    )
}
