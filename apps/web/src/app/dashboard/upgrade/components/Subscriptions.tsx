import { Check, Sparkles } from 'lucide-react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from 'src/components/ui/card'
import { PurchaseButton } from './PurchaseButton'
import { ProductTypeEnum } from '@client-types/payment/payment.model'
import { getFeature } from '../../../../../../../libs/utils/src/feature'
import { Tooltip, TooltipContent } from 'src/components/ui/tooltip'
import { TooltipTrigger } from '@radix-ui/react-tooltip'

export const Subscriptions = () => {
    // @State
    const subscriptionsEnabled = getFeature('FEATURE_SUBSCRIPTIONS')

    // @Render
    return (
        <div className="grid sm:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <CardTitle>Standard Subscription</CardTitle>
                    <CardDescription>Best for regular creators</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold">$19.99</span>
                        <span className="text-muted-foreground">/month</span>
                    </div>
                    <ul className="mt-4 space-y-2">
                        <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>25 credits monthly</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>Priority support</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>Rollover up to 50 credits</span>
                        </li>
                    </ul>
                </CardContent>
                <CardFooter>
                    {subscriptionsEnabled ? (
                        <PurchaseButton
                            product={ProductTypeEnum.MiniSubscription}
                            subscription
                        />
                    ) : (
                        <Tooltip>
                            <TooltipTrigger>
                                <PurchaseButton
                                    product={ProductTypeEnum.MiniSubscription}
                                    subscription
                                    disabled
                                />
                            </TooltipTrigger>
                            <TooltipContent side="bottom" align="center">
                                Subscriptions coming soon
                            </TooltipContent>
                        </Tooltip>
                    )}
                </CardFooter>
            </Card>

            <Card className="relative overflow-hidden border-2 border-indigo-400">
                <div className="absolute top-0 right-0 px-4 py-2 bg-indigo-400 text-white text-sm font-medium rounded-bl-lg">
                    Most Popular
                </div>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <CardTitle>Premium Subscription</CardTitle>
                        <Sparkles className="h-5 w-5 text-indigo-400" />
                    </div>
                    <CardDescription>For power users</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold">$39.99</span>
                        <span className="text-muted-foreground">/month</span>
                    </div>
                    <ul className="mt-4 space-y-2">
                        <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>60 credits monthly</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>Priority support</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>Rollover up to 120 credits</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>Early access to new features</span>
                        </li>
                    </ul>
                </CardContent>
                <CardFooter>
                    {subscriptionsEnabled ? (
                        <PurchaseButton
                            product={ProductTypeEnum.PremiumSubscription}
                            subscription
                        />
                    ) : (
                        <Tooltip>
                            <TooltipTrigger>
                                <PurchaseButton
                                    product={
                                        ProductTypeEnum.PremiumSubscription
                                    }
                                    subscription
                                    disabled
                                />
                            </TooltipTrigger>
                            <TooltipContent side="bottom" align="center">
                                Subscriptions coming soon
                            </TooltipContent>
                        </Tooltip>
                    )}
                </CardFooter>
            </Card>
        </div>
    )
}
