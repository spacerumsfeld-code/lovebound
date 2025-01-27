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

export const Subscriptions = () => {
    // *Render
    return (
        <div className="grid sm:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <CardTitle>Casual Subscription</CardTitle>
                    <CardDescription>Best for casual users</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold">$8.95</span>
                        <span className="text-muted-foreground">/month</span>
                    </div>
                    <ul className="mt-4 space-y-2">
                        <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>10 credits/month</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>Basic email and chat support</span>
                        </li>
                    </ul>
                </CardContent>
                <CardFooter>
                    <PurchaseButton
                        product={ProductTypeEnum.CasualSubscription}
                        subscription
                    />
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
                    <CardDescription>For Romance junkies</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold">$19.95</span>
                        <span className="text-muted-foreground">/month</span>
                    </div>
                    <ul className="mt-4 space-y-2">
                        <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>30 credits/month</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>Audio narration</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>Novella-length stories</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>Early access to new features</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>Personalized email and chat support</span>
                        </li>
                    </ul>
                </CardContent>
                <CardFooter>
                    <PurchaseButton
                        product={ProductTypeEnum.PremiumSubscription}
                        subscription
                    />
                </CardFooter>
            </Card>
        </div>
    )
}
