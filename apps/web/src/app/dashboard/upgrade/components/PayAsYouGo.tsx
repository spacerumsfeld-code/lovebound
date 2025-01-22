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
                    Make stories at your own pace.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid sm:grid-cols-3 gap-4">
                    <Card className="border-2">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">
                                10 Credits
                            </CardTitle>
                            <CardDescription>Mini Topup</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">$10</p>
                            <ul className="mt-4 space-y-2">
                                <li className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-green-500" />
                                    <span>Never expire</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-green-500" />
                                    <span>Infinite Rollover</span>
                                </li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <PurchaseButton
                                product={ProductTypeEnum.Credits10Pack}
                            />
                        </CardFooter>
                    </Card>

                    <Card className="border-2">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">
                                20 Credits
                            </CardTitle>
                            <CardDescription>Standard Topup</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">$20</p>
                            <ul className="mt-4 space-y-2">
                                <li className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-green-500" />
                                    <span>Never expire</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-green-500" />
                                    <span>Infinite Rollover</span>
                                </li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <PurchaseButton
                                product={ProductTypeEnum.Credits10Pack}
                            />
                        </CardFooter>
                    </Card>

                    <Card className="relative overflow-hidden border-2">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">
                                50 Credits
                            </CardTitle>
                            <CardDescription>Power Pack</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">$50</p>
                            <ul className="mt-4 space-y-2">
                                <li className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-green-500" />
                                    <span>Never expire</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-green-500" />
                                    <span>Infinite Rollover</span>
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
