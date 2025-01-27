'use client'

import { ProductTypeEnum } from '@client-types/payment/payment.model'
import { createCheckoutSession } from '../server'
import { Button } from 'src/components/ui/button'
import useLoading from 'src/hooks/use-loading'
import { Loader2 } from 'lucide-react'

export const PurchaseButton = (props: {
    product: ProductTypeEnum
    subscription?: boolean
    disabled?: boolean
}) => {
    // @State
    const { isLoading, startLoading } = useLoading()

    // @Interactivity
    const handlePurchaseProduct = async (productType: ProductTypeEnum) => {
        if (props.disabled) return
        startLoading('upgrade')
        createCheckoutSession({
            productType,
        })
    }

    // @Render
    return (
        <Button
            className={'flex items-center justify-center'}
            onClick={() => handlePurchaseProduct(props.product)}
            disabled={isLoading('upgrade')}
        >
            {isLoading('upgrade') && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {props.subscription ? 'Subscribe' : 'Buy Now'}
        </Button>
    )
}
