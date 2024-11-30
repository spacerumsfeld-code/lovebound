'use client'

import React, { useEffect } from 'react'
import { motion, useAnimation, AnimationControls } from 'framer-motion'
import { cn } from '@web/src/lib/utils'
import { Card, CardContent, CardHeader } from '@web/src/components/ui/card'
import { Separator } from '@web/src/components/ui/separator'
import Image from 'next/image'
import { Logo } from './logo'

/**
 * 
 * const BackgroundGrids = () => {
    return (
        <div className="pointer-events-none absolute inset-0 z-0 grid h-full w-full -rotate-45 transform select-none grid-cols-2 gap-10 md:grid-cols-4">
            <div className="relative h-full w-full">
                <GridLineVertical className="left-0" />
                <GridLineVertical className="left-auto right-0" />
            </div>
            <div className="relative h-full w-full">
                <GridLineVertical className="left-0" />
                <GridLineVertical className="left-auto right-0" />
            </div>
            <div className="relative h-full w-full bg-gradient-to-b from-transparent via-neutral-100 to-transparent dark:via-neutral-800">
                <GridLineVertical className="left-0" />
                <GridLineVertical className="left-auto right-0" />
            </div>
            <div className="relative h-full w-full">
                <GridLineVertical className="left-0" />
                <GridLineVertical className="left-auto right-0" />
            </div>
        </div>
    )
}
 */

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
        </div>
    )
}
