import React from 'react'
import { IconCheck } from '@tabler/icons-react'
import { cn } from '../../lib/utils'
import { Button } from '../../components/ui/button'

export type Plan = {
    id: string
    name: string
    price: number | string
    subText?: string
    currency: string
    features: string[]
    buttonText?: string
    href: string
}

const plans: Array<Plan> = [
    {
        id: 'Plan.PayAsYouGo',
        name: 'Pay as you go',
        price: 1,
        subText: '/credit',
        currency: '$',
        features: [
            'Pay for credits to create stories at your own pace',
            'No obligation',
        ],
        buttonText: 'Get Casual',
        href: '/dashboard/create',
    },
    {
        id: 'Plan.Casual',
        name: 'Casual',
        price: 8.95,
        subText: '/month',
        currency: '$',
        features: [
            '10 credits/month @10% off',
            'Fullfill your fantasies for the price of a Starbucks mocha/month',
        ],
        buttonText: 'Get Casual',
        href: '/dashboard/create',
    },
    {
        id: 'Plan.Premium',
        name: 'Premium',
        price: 19.95,
        subText: '/month',
        currency: '$',
        features: [
            '30 credits/month @maximum savings',
            'Audio narration',
            'Novella-length stories',
            'Personalized email and chat support',
        ],
        buttonText: 'Get Premium',
        href: '/dashboard/create',
    },
]

export const Pricing = () => {
    return (
        <div
            id="pricing"
            className="w-full px-4 py-8 sm:py-20 lg:px-4 relative"
        >
            <div
                className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
                aria-hidden="true"
            ></div>
            <>
                <h2 className="pt-4 font-bold text-lg md:text-4xl text-center text-neutral-800 dark:text-neutral-100">
                    Simple and flexible pricing
                </h2>
                <p className="max-w-md mx-auto text-base text-center text-neutral-600 dark:text-neutral-300 mt-4">
                    Our pricing is designed to be flexible and simple. Pay as
                    you go with no obligation or subscribe to a plan for a
                    discounted rate. All plans can be cancelled at any time.
                </p>
            </>

            <div
                className={cn(
                    'mx-auto grid grid-cols-1 gap-4  mt-20 ',
                    'max-w-7xl mx-auto  md:grid-cols-2 xl:grid-cols-3',
                )}
            >
                {plans.map((tier) => {
                    return <Card plan={tier} key={tier.id} />
                })}
            </div>
        </div>
    )
}

const Card = ({ plan }: { plan: Plan }) => {
    return (
        <div
            className={cn(
                'p-1 sm:p-4 md:p-4 rounded-3xl bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800',
            )}
        >
            <div className="flex flex-col gap-4 h-full justify-start">
                <div
                    className={cn(
                        'p-4 bg-white dark:bg-neutral-800 rounded-2xl shadow-input w-full dark:shadow-[0px_-1px_0px_0px_var(--neutral-700)]',
                    )}
                >
                    <div className="flex justify-between items-start ">
                        <div className="flex gap-2 flex-col">
                            <p
                                className={cn(
                                    'font-medium text-lg text-black dark:text-white',
                                )}
                            >
                                {plan.name}
                            </p>
                        </div>
                    </div>
                    <div className="mt-8 ">
                        <div className="flex items-end">
                            <span
                                className={cn(
                                    'text-lg font-bold text-neutral-500 dark:text-neutral-200',
                                )}
                            >
                                {plan.currency}
                            </span>
                            <div className="flex items-start gap-2">
                                <span
                                    className={cn(
                                        'text-3xl md:text-7xl font-bold dark:text-neutral-50 text-neutral-800',
                                    )}
                                >
                                    {plan?.price}
                                </span>
                            </div>
                            <span
                                className={cn(
                                    'text-base font-normal text-neutral-500 dark:text-neutral-200 mb-1 md:mb-2',
                                )}
                            >
                                {plan.subText}
                            </span>
                        </div>
                    </div>
                    <Button
                        className="w-full mt-10 bg-indigo-400 text-white"
                        href={plan.href}
                    >
                        {plan.buttonText}
                    </Button>
                </div>
                <div className="mt-1 p-4">
                    {plan.features.map((feature, idx) => (
                        <Step key={idx}>{feature}</Step>
                    ))}
                </div>
            </div>
        </div>
    )
}

const Step = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex items-start justify-start gap-2 my-4">
            <div
                className={cn(
                    'h-4 w-4 rounded-full bg-neutral-700 flex items-center justify-center flex-shrink-0 mt-0.5',
                )}
            >
                <IconCheck className="h-3 w-3 [stroke-width:4px] text-neutral-300" />
            </div>
            <div
                className={cn('font-medium text-black text-sm dark:text-white')}
            >
                {children}
            </div>
        </div>
    )
}
