'use client'

import { cn } from '../../lib/utils'
import React from 'react'
import { ArrowRight } from 'lucide-react'
import { Button } from 'src/components/ui/button'

export const CTA = () => {
    return (
        <section
            id="get-started"
            className="w-full grid grid-cols-1 md:grid-cols-3 my-20 md:my-40 justify-start relative z-20 max-w-7xl mx-auto bg-gradient-to-br from-gray-100 to-white dark:from-neutral-900 dark:to-neutral-950"
        >
            <GridLineHorizontal className="top-0" offset="0px" />
            <GridLineHorizontal className="bottom-0 top-auto" offset="0px" />
            <GridLineVertical className="left-0" offset="0px" />
            <GridLineVertical className="left-auto right-0" offset="0px" />
            <div className="md:col-span-2 p-8 md:p-14">
                <h2 className="text-left text-neutral-500 dark:text-neutral-200 text-xl md:text-3xl tracking-tight font-medium">
                    Sign up to claim a month&apos;s worth of{' '}
                    <span className="text-indigo-500">free stories</span>
                </h2>
                <p className="text-left text-neutral-500 mt-4 max-w-lg dark:text-neutral-200 text-xl md:text-3xl tracking-tight font-medium">
                    with no obligation.
                </p>

                <div className="flex items-start sm:items-center flex-col sm:flex-row sm:gap-4 mt-6">
                    <Button
                        href="/login"
                        variant="primary"
                        className="hidden md:flex gap-x-2 group justify-center items-center"
                    >
                        Claim Free Stories
                        <ArrowRight className="text-white group-hover:translate-x-1 stroke-[1px] h-3 w-3 mt-0.5 transition-transform duration-200" />
                    </Button>
                </div>
            </div>
            <div className="border-t md:border-t-0 md:border-l border-dashed p-8 md:p-14">
                <p className="text-base text-neutral-700 dark:text-neutral-200">
                    Join thousands of satisfied readers who&apos;ve discovered
                    their favorite tool for romance, no strings attached.
                </p>
            </div>
        </section>
    )
}

const GridLineHorizontal = ({
    className,
    offset,
}: {
    className?: string
    offset?: string
}) => {
    return (
        <div
            style={
                {
                    '--background': '#ffffff',
                    '--color': 'rgba(0, 0, 0, 0.2)',
                    '--height': '1px',
                    '--width': '5px',
                    '--fade-stop': '90%',
                    '--offset': offset || '200px',
                    '--color-dark': 'rgba(255, 255, 255, 0.2)',
                    maskComposite: 'exclude',
                } as React.CSSProperties
            }
            className={cn(
                'absolute w-[calc(100%+var(--offset))] h-[var(--height)] left-[calc(var(--offset)/2*-1)]',
                'bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]',
                '[background-size:var(--width)_var(--height)]',
                '[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]',
                '[mask-composite:exclude]',
                'z-30',
                'dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]',
                className,
            )}
        ></div>
    )
}

const GridLineVertical = ({
    className,
    offset,
}: {
    className?: string
    offset?: string
}) => {
    return (
        <div
            style={
                {
                    '--background': '#ffffff',
                    '--color': 'rgba(0, 0, 0, 0.2)',
                    '--height': '5px',
                    '--width': '1px',
                    '--fade-stop': '90%',
                    '--offset': offset || '150px', //-100px if you want to keep the line inside
                    '--color-dark': 'rgba(255, 255, 255, 0.2)',
                    maskComposite: 'exclude',
                } as React.CSSProperties
            }
            className={cn(
                'absolute h-[calc(100%+var(--offset))] w-[var(--width)] top-[calc(var(--offset)/2*-1)]',
                'bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)]',
                '[background-size:var(--width)_var(--height)]',
                '[mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]',
                '[mask-composite:exclude]',
                'z-30',
                'dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]',
                className,
            )}
        ></div>
    )
}
