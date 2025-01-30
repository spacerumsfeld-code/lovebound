'use client'

import { ProductTypeEnum } from '@client-types/payment/payment.model'
import { createCheckoutSession } from '../server'
import { Button } from 'src/components/ui/button'
import useLoading from 'src/hooks/use-loading'
import { Loader2 } from 'lucide-react'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from 'src/components/ui/tooltip'

export const PurchaseButton = (props: {
    product: ProductTypeEnum
    subscription?: boolean
    disabled?: boolean
}) => {
    // @State
    const { isLoading, startLoading } = useLoading()
    const shouldDisplayTooltip = Boolean(props.subscription && props.disabled)

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
        <>
            {shouldDisplayTooltip ? (
                <Tooltip>
                    <TooltipTrigger>
                        <Button
                            className={'flex items-center justify-center'}
                            onClick={() => handlePurchaseProduct(props.product)}
                            disabled={isLoading('upgrade') || props.disabled}
                        >
                            {isLoading('upgrade') && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            {props.subscription ? 'Subscribe' : 'Buy Now'}
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top" align="center">
                        Manage subscriptions by clicking &quot;Billing&quot; on
                        the left.
                    </TooltipContent>
                </Tooltip>
            ) : (
                <Button
                    className={'flex items-center justify-center'}
                    onClick={() => handlePurchaseProduct(props.product)}
                    disabled={isLoading('upgrade') || props.disabled}
                >
                    {isLoading('upgrade') && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {props.subscription ? 'Subscribe' : 'Buy Now'}
                </Button>
            )}
        </>
    )
}
