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
import { getCurrentSubscriptionType } from '../../data'

export const Subscriptions = async () => {
    // *Data
    const { currentSubscriptionType } = await getCurrentSubscriptionType()
    const userHasSubscription = Boolean(currentSubscriptionType)

    // *Render
    return (
        <div className="grid sm:grid-cols-2 gap-8">
            <Card className="relative overflow-hidden border-2 border-indigo-400">
                <div className="absolute top-0 right-0 px-4 py-2 bg-indigo-400 text-white text-sm font-medium rounded-bl-lg">
                    Most Popular
                </div>
                <CardHeader>
                    <CardTitle>Creator Pass</CardTitle>
                    <CardDescription>
                        Access to all features and updates
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold">$7.95</span>
                        <span className="text-muted-foreground">/month</span>
                    </div>
                    <ul className="mt-4 space-y-2">
                        <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>
                                Fulfill your fantasies for the price of a
                                Starbucks mocha/month
                            </span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>25 credits/month</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>Audio narration</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>Custom story covers</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>
                                Access to our longest story lengths (novels
                                coming!)
                            </span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>Personalized customer support</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>
                                Early access to new features and updates
                            </span>
                        </li>
                    </ul>
                </CardContent>
                <CardFooter>
                    <PurchaseButton
                        product={ProductTypeEnum.CreatorPass}
                        subscription
                        disabled={userHasSubscription}
                    />
                </CardFooter>
            </Card>
        </div>
    )
}
