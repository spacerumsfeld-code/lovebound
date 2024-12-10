'use client'

import React, { useEffect } from 'react'
import { motion, useAnimation, AnimationControls } from 'framer-motion'
import { cn } from '../../lib/utils'
import { Card, CardContent, CardHeader } from '../../components/ui/card'
import { Separator } from '../../components/ui/separator'
import Image from 'next/image'
import { Logo } from './logo'

const transition = {
    duration: 3,
    ease: 'easeInOut',
    repeat: Infinity,
    repeatType: 'loop' as const,
}

const AnimatedPath = ({
    d,
    stroke,
    controls,
}: {
    d: string
    stroke: string
    controls: AnimationControls
}) => (
    <>
        <path d={d} stroke={stroke} strokeWidth="4" fill="none" opacity={0.2} />
        <motion.path
            d={d}
            stroke={stroke}
            strokeWidth="4"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={controls}
            transition={transition}
        />
    </>
)

export const GeminiFlowEffect = ({ className }: { className?: string }) => {
    const controls1 = useAnimation()
    const controls2 = useAnimation()
    const controls3 = useAnimation()
    const controls4 = useAnimation()
    const controlsOutput = useAnimation()

    useEffect(() => {
        const animate = async () => {
            // First animate input paths
            await Promise.all([
                controls1.start({ pathLength: 1 }),
                controls2.start({ pathLength: 1 }),
                controls3.start({ pathLength: 1 }),
                controls4.start({ pathLength: 1 }),
            ])

            // Then animate output path
            await controlsOutput.start({ pathLength: 1 })

            // Reset input paths
            await Promise.all([
                controls1.start({ pathLength: 0 }),
                controls2.start({ pathLength: 0 }),
                controls3.start({ pathLength: 0 }),
                controls4.start({ pathLength: 0 }),
            ])

            // Reset output path
            await controlsOutput.start({ pathLength: 0 })

            // Restart the sequence
            animate()
        }

        animate()

        return () => {
            controls1.stop()
            controls2.stop()
            controls3.stop()
            controls4.stop()
            controlsOutput.stop()
        }
    }, [controls1, controls2, controls3, controls4, controlsOutput])

    return (
        <div
            className={cn(
                'max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-3 align-middle justify-center gap-12 relative',
                className,
            )}
        >
            <div className="flex flex-col gap-8">
                <div className="relative px-3 z-50 py-1 rounded-full text-sm font-medium transition-all bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700 border border-gray-200 dark:border-gray-700">
                    <div>Forbidden Romance</div>
                </div>
                <Card>
                    <CardHeader>Scenario</CardHeader>
                    <Separator />
                    <CardContent className="w-full">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed non risus. Suspendisse lectus tortor, dignissim sit
                        amet, adipiscing nec, ultricies sed, dolor. Cras
                        elementum ultrices diam. Maecenas ligula massa, varius
                        a, semper congue, euismod non, mi.
                    </CardContent>
                </Card>
                <div className="relative px-3 z-50 py-1 rounded-full text-sm font-medium transition-all bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700 border border-gray-200 dark:border-gray-700">
                    <div>Forbidden Romance</div>
                </div>
                <div className="relative px-3 z-50 py-1 rounded-full text-sm font-medium transition-all bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700 border border-gray-200 dark:border-gray-700">
                    <div>Tension Level: Max</div>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center">
                <Card className="flex flex-col items-center justify-center">
                    <Logo height={100} width={100} noLabel />
                </Card>
            </div>

            <div className="flex justify-right items-center rounded-md">
                <Image
                    src="/sampleStoryCover.webp"
                    alt="Story Cover"
                    height={400}
                    width={300}
                    className="rounded-md h-full w-[300px]"
                />
            </div>

            <svg
                width="100%"
                height="100%"
                viewBox="0 0 1000 600"
                preserveAspectRatio="none"
                className="absolute top-0 left-0"
            >
                {/* Path from top pill to center */}
                <AnimatedPath
                    d="M250 30 Q375 30 500 300"
                    stroke="#FFB7C5"
                    controls={controls1}
                />
                {/* Path from scenario card to center */}
                <AnimatedPath
                    d="M250 180 Q375 180 500 300"
                    stroke="#FFDDB7"
                    controls={controls2}
                />
                {/* Path from second pill to center */}
                <AnimatedPath
                    d="M250 400 Q375 400 500 300"
                    stroke="#B1C5FF"
                    controls={controls3}
                />
                {/* Path from bottom pill to center */}
                <AnimatedPath
                    d="M250 500 Q375 500 500 300"
                    stroke="#4FABFF"
                    controls={controls4}
                />
                {/* Path from center to output image */}
                <AnimatedPath
                    d="M550 300 L850 300"
                    stroke="#076EFF"
                    controls={controlsOutput}
                />
            </svg>
            <GridLineHorizontal
                className="top-0 left-1/2 -translate-x-1/2"
                offset="-10px"
            />
            <GridLineHorizontal
                className="bottom-0 top-auto  left-1/2 -translate-x-1/2"
                offset="-10px"
            />
            <GridLineVertical
                className="left-10  top-1/2 -translate-y-1/2"
                offset="-10px"
            />
            <GridLineVertical
                className="right-10 left-auto top-1/2 -translate-y-1/2"
                offset="-10px"
            />
        </div>
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
                    '--offset': offset || '200px', //-100px if you want to keep the line inside
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
