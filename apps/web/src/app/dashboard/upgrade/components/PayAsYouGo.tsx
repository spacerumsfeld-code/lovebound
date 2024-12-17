import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from 'src/components/ui/card'
import { ProductTypeEnum } from '@client-types/payment/payment.model'
import { Check } from 'lucide-react'
import { PurchaseButton } from './PurchaseButton'

export const PayAsYouGo = () => {
    // @Render
    return (
        <Card className="relative overflow-hidden border-2 border-indigo-400/20">
            <div className="absolute top-0 right-0 px-4 py-2 bg-indigo-300 text-white text-sm font-medium rounded-bl-lg">
                Pay As You Go
            </div>
            <CardHeader>
                <CardTitle>Credit Packs</CardTitle>
                <CardDescription>
                    Perfect for occasional story creation
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid sm:grid-cols-3 gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">
                                10 Credits
                            </CardTitle>
                            <CardDescription>Basic Pack</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">$10</p>
                            <p className="text-sm text-muted-foreground">
                                $1 per credit
                            </p>
                            <ul className="mt-4 space-y-2">
                                <li className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-green-500" />
                                    <span>10 story generations</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-green-500" />
                                    <span>Never expires</span>
                                </li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <PurchaseButton
                                product={ProductTypeEnum.Credits10Pack}
                            />
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">
                                20 Credits
                            </CardTitle>
                            <CardDescription>Popular Pack</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">$18</p>
                            <p className="text-sm text-muted-foreground">
                                $0.90 per credit
                            </p>
                            <ul className="mt-4 space-y-2">
                                <li className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-green-500" />
                                    <span>20 story generations</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-green-500" />
                                    <span>10% savings</span>
                                </li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <PurchaseButton
                                product={ProductTypeEnum.Credits20Pack}
                            />
                        </CardFooter>
                    </Card>

                    <Card className="relative overflow-hidden border-2 border-indigo-400">
                        <div className="absolute -top-4 -right-16 px-12 py-1 bg-indigo-400 text-white text-sm font-medium rotate-45">
                            Best Value
                        </div>
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">
                                50 Credits
                            </CardTitle>
                            <CardDescription>Power Pack</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">$40</p>
                            <p className="text-sm text-muted-foreground">
                                $0.80 per credit
                            </p>
                            <ul className="mt-4 space-y-2">
                                <li className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-green-500" />
                                    <span>50 story generations</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-green-500" />
                                    <span>20% savings</span>
                                </li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <PurchaseButton
                                product={ProductTypeEnum.Credits50Pack}
                            />
                        </CardFooter>
                    </Card>
                </div>
            </CardContent>
        </Card>
    )
}
