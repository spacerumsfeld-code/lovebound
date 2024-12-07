'use client'

import { Button } from '@web/src/components/ui/buttonTwo'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@web/src/components/ui/card'
import { Check, Sparkles } from 'lucide-react'
import { createCheckoutSession } from '../data'
import { ProductTypeEnum } from '@client-types/payment/payment.model'

// @todo: Needless to say, we need to adjust this copy

export const UpgradePage = () => {
    // @Interactivity
    const handlePurchaseCredits = async (productType: ProductTypeEnum) => {
        createCheckoutSession({
            productType,
        })
    }

    // @Render
    return (
        <div className="container max-w-6xl mx-auto px-4 py-8">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-teal bg-clip-text text-transparent">
                    Choose Your Plan
                </h1>
                <p className="text-lg text-muted-foreground">
                    Unlock your creative potential with our flexible pricing
                    options
                </p>
            </div>

            <div className="grid gap-8 mb-12">
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
                                    <CardDescription>
                                        Basic Pack
                                    </CardDescription>
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
                                    <Button
                                        onClick={() =>
                                            handlePurchaseCredits(
                                                ProductTypeEnum.Credits10Pack,
                                            )
                                        }
                                    >
                                        Buy Now
                                    </Button>
                                </CardFooter>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-2xl font-bold">
                                        20 Credits
                                    </CardTitle>
                                    <CardDescription>
                                        Popular Pack
                                    </CardDescription>
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
                                    <Button
                                        onClick={() =>
                                            handlePurchaseCredits(
                                                ProductTypeEnum.Credits20Pack,
                                            )
                                        }
                                    >
                                        Buy Now
                                    </Button>
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
                                    <CardDescription>
                                        Power Pack
                                    </CardDescription>
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
                                    <Button
                                        onClick={() =>
                                            handlePurchaseCredits(
                                                ProductTypeEnum.Credits50Pack,
                                            )
                                        }
                                    >
                                        Buy Now
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid sm:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Standard Subscription</CardTitle>
                            <CardDescription>
                                Best for regular creators
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-bold">
                                    $19.99
                                </span>
                                <span className="text-muted-foreground">
                                    /month
                                </span>
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
                            <Button
                                onClick={() =>
                                    handlePurchaseCredits(
                                        ProductTypeEnum.MiniSubscription,
                                    )
                                }
                                className="w-full"
                                variant="outline"
                            >
                                Subscribe Monthly
                            </Button>
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
                                <span className="text-3xl font-bold">
                                    $39.99
                                </span>
                                <span className="text-muted-foreground">
                                    /month
                                </span>
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
                            <Button
                                onClick={() =>
                                    handlePurchaseCredits(
                                        ProductTypeEnum.PremiumSubscription,
                                    )
                                }
                            >
                                Subscribe Monthly
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}
