'use client'

import React, { useEffect } from 'react'
import { motion, useAnimation, AnimationControls } from 'framer-motion'
import { cn } from '../../lib/utils'
import { Card } from '../../components/ui/card'
import { Logo } from './logo'
import { OptimizedImage } from 'src/components/ui/image/optimized-image'

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

export const Demonstration = ({ className }: { className?: string }) => {
    const controls1 = useAnimation()
    const controls2 = useAnimation()
    const controls3 = useAnimation()
    const controls4 = useAnimation()
    const controlsOutput = useAnimation()

    useEffect(() => {
        const animate = async () => {
            await Promise.all([
                controls1.start({ pathLength: 1 }),
                controls2.start({ pathLength: 1 }),
                controls3.start({ pathLength: 1 }),
                controls4.start({ pathLength: 1 }),
                controlsOutput.start({ pathLength: 1 }),
            ])

            await Promise.all([
                controls1.start({ pathLength: 0 }),
                controls2.start({ pathLength: 0 }),
                controls3.start({ pathLength: 0 }),
                controls4.start({ pathLength: 0 }),
                await controlsOutput.start({ pathLength: 0 }),
            ])
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
        <div className="w-full relative py-20 px-4 mx-auto">
            <div className="mb-32">
                <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white">
                    Your fantasies, come to life.
                </h4>
            </div>
            <div
                className={cn(
                    'max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-3 align-middle justify-center gap-12 relative',
                    className,
                )}
            >
                <div className="flex flex-col gap-8 justify-between">
                    <div className="relative px-6 py-3 rounded-xl text-sm font-medium transition-all bg-white/50 backdrop-blur-sm dark:bg-zinc-800/50 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-700 border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:scale-105 transform duration-200">
                        <div>Genre: Historical</div>
                    </div>
                    <div className="relative px-6 py-3 rounded-xl text-sm font-medium transition-all bg-white/50 backdrop-blur-sm dark:bg-zinc-800/50 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-700 border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:scale-105 transform duration-200">
                        <div>Theme: Forbidden Romance</div>
                    </div>
                    <div className="relative px-6 py-3 rounded-xl text-sm font-medium transition-all bg-white/50 backdrop-blur-sm dark:bg-zinc-800/50 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-700 border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:scale-105 transform duration-200">
                        <div>Tone: Sultry</div>
                    </div>
                    <div className="relative px-6 py-3 rounded-xl text-sm font-medium transition-all bg-white/50 backdrop-blur-sm dark:bg-zinc-800/50 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-700 border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:scale-105 transform duration-200">
                        <div>Tension Level: Max</div>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center">
                    <Card className="flex flex-col items-center justify-center">
                        <Logo height={100} width={100} />
                    </Card>
                </div>
                <OptimizedImage
                    src="https://cdn.sanity.io/images/vjg0x5qe/production/8820a451ab8ec2873d74ed02812594219c99978f-1024x1024.webp"
                    alt="Sample Story Cover"
                    height={600}
                    width={400}
                    mobileWidth="100vw"
                    className="rounded-lg shadow-xl ring-2 ring-gray-200"
                />
                <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 1000 600"
                    preserveAspectRatio="none"
                    className="absolute top-0 left-0 hidden md:block"
                >
                    {/* Path from top pill to center */}
                    <AnimatedPath
                        d="M306 40 Q300 30 500 300"
                        stroke="#FFB7C5"
                        controls={controls1}
                    />
                    {/* Path from scenario card to center */}
                    <AnimatedPath
                        d="M305 200 Q375 180 500 300"
                        stroke="#FFDDB7"
                        controls={controls2}
                    />
                    {/* Path from second pill to center */}
                    <AnimatedPath
                        d="M306 400 Q375 400 500 300"
                        stroke="#B1C5FF"
                        controls={controls3}
                    />
                    {/* Path from bottom pill to center */}
                    <AnimatedPath
                        d="M307 570 Q400 480 500 300"
                        stroke="#4FABFF"
                        controls={controls4}
                    />
                    {/* Path from center to output image */}
                    <AnimatedPath
                        d="M500 300 L690 300"
                        stroke="#818cf8"
                        controls={controlsOutput}
                    />
                </svg>
            </div>
        </div>
    )
}
