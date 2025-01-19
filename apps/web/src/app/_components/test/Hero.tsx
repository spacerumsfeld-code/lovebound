'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Balancer from 'react-wrap-balancer'
import { Button } from '../../../components/ui/button'
import { HeartBeam } from './HeartBeam'
import { BackgroundGrids } from '../BackgroundGrids'
import { ArrowRight } from 'lucide-react'

export const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const parentRef = useRef<HTMLDivElement>(null)

    return (
        <div
            ref={parentRef}
            className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-20 md:px-8 md:py-40 bg-neutral-50 dark:bg-neutral-900"
        >
            <BackgroundGrids rotate="-rotate-45" />
            <HeartBeamCollision
                containerRef={containerRef}
                parentRef={parentRef}
                beamOptions={{
                    initialX: -400,
                    translateX: 600,
                    initialY: -200,
                    translateY: 800,
                    rotate: -45,
                    duration: 5,
                    delay: 0,
                    repeatDelay: 1,
                }}
            />
            <HeartBeamCollision
                containerRef={containerRef}
                parentRef={parentRef}
                beamOptions={{
                    initialX: -200,
                    translateX: 800,
                    initialY: -100,
                    translateY: 700,
                    rotate: -30,
                    duration: 4,
                    delay: 1,
                    repeatDelay: 1,
                }}
            />
            <HeartBeamCollision
                containerRef={containerRef}
                parentRef={parentRef}
                beamOptions={{
                    initialX: 200,
                    translateX: 1200,
                    initialY: -300,
                    translateY: 900,
                    rotate: -60,
                    duration: 5,
                    delay: 2,
                    repeatDelay: 1,
                }}
            />
            <HeartBeamCollision
                containerRef={containerRef}
                parentRef={parentRef}
                beamOptions={{
                    initialX: 400,
                    translateX: 1400,
                    initialY: -150,
                    translateY: 750,
                    rotate: -15,
                    duration: 6,
                    delay: 3,
                    repeatDelay: 1,
                }}
            />

            <div className="text-balance relative z-20 mx-auto mb-4 mt-4 max-w-4xl text-center text-3xl font-semibold tracking-tight text-gray-700 dark:text-neutral-300 md:text-7xl">
                <Balancer>
                    <motion.h2>
                        {'Your Perfect Romance Stories, AI-Crafted'
                            .split(' ')
                            .map((word, index) => (
                                <motion.span
                                    initial={{
                                        filter: 'blur(10px)',
                                        opacity: 0,
                                        y: 10,
                                    }}
                                    animate={{
                                        filter: 'blur(0px)',
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    transition={{
                                        duration: 0.4,
                                        delay: index * 0.05,
                                    }}
                                    className="inline-block"
                                    key={index}
                                >
                                    {word}&nbsp;
                                </motion.span>
                            ))}
                    </motion.h2>
                </Balancer>
            </div>
            <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.5 }}
                className="relative z-20 mx-auto mt-4 max-w-lg px-4 text-center text-base/6 text-gray-600 dark:text-gray-200"
            >
                Choose your genre, theme, tension level, and setting to craft
                your perfect romance narratives.
            </motion.p>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.7 }}
                className="mb-10 mt-8 flex w-full flex-col items-center justify-center gap-4 px-8 sm:flex-row md:mb-20"
            >
                <Button
                    href="/login"
                    variant="primary"
                    className="flex gap-x-2 group justify-center items-center"
                >
                    Get Started
                    <ArrowRight className="text-white group-hover:translate-x-1 stroke-[1px] h-3 w-3 mt-0.5 transition-transform duration-200" />
                </Button>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.9, ease: 'easeOut' }}
                ref={containerRef}
                className="relative mx-auto max-w-7xl rounded-[32px] border border-neutral-200/50 bg-neutral-100 p-2 backdrop-blur-lg dark:border-neutral-700 dark:bg-neutral-800/50 md:p-4"
            >
                <div className="rounded-[24px] border border-neutral-200 bg-white p-2 dark:border-neutral-700 dark:bg-black">
                    <Image
                        src="https://cdn.sanity.io/images/vjg0x5qe/production/e4f2c267d56e042817bba93434a32df05aaeb77e-3024x1964.png"
                        alt="Romance As a Service preview"
                        width={1920}
                        height={1080}
                        className="rounded-[20px]"
                    />
                </div>
            </motion.div>
        </div>
    )
}

const HeartBeamCollision = React.forwardRef<
    HTMLDivElement,
    {
        containerRef: React.RefObject<HTMLDivElement | null>
        parentRef: React.RefObject<HTMLDivElement | null>
        beamOptions: {
            initialX: number
            translateX: number
            initialY: number
            translateY: number
            rotate: number
            duration: number
            delay: number
            repeatDelay: number
        }
    }
>(({ parentRef, containerRef, beamOptions }, _ref) => {
    const beamRef = useRef<SVGPathElement>(null)
    const [collision, setCollision] = useState<{
        detected: boolean
        coordinates: { x: number; y: number } | null
    }>({
        detected: false,
        coordinates: null,
    })
    const [beamKey, setBeamKey] = useState(0)
    const [cycleCollisionDetected, setCycleCollisionDetected] = useState(false)

    useEffect(() => {
        const checkCollision = () => {
            if (
                beamRef.current &&
                containerRef.current &&
                parentRef.current &&
                !cycleCollisionDetected
            ) {
                const beamRect = beamRef.current.getBoundingClientRect()
                const containerRect =
                    containerRef.current.getBoundingClientRect()
                const parentRect = parentRef.current.getBoundingClientRect()

                if (beamRect.bottom >= containerRect.top) {
                    const relativeX =
                        beamRect.left - parentRect.left + beamRect.width / 2
                    const relativeY = beamRect.bottom - parentRect.top

                    setCollision({
                        detected: true,
                        coordinates: {
                            x: relativeX,
                            y: relativeY,
                        },
                    })
                    setCycleCollisionDetected(true)
                    if (beamRef.current) {
                        beamRef.current.style.opacity = '0'
                    }
                }
            }
        }

        const animationInterval = setInterval(checkCollision, 50)

        return () => clearInterval(animationInterval)
    }, [cycleCollisionDetected, containerRef, parentRef])

    useEffect(() => {
        if (collision.detected && collision.coordinates) {
            setTimeout(() => {
                setCollision({ detected: false, coordinates: null })
                setCycleCollisionDetected(false)
                if (beamRef.current) {
                    beamRef.current.style.opacity = '1'
                }
            }, 2000)

            setTimeout(() => {
                setBeamKey((prevKey) => prevKey + 1)
            }, 2000)
        }
    }, [collision])

    return (
        <>
            <svg
                key={beamKey}
                className="absolute left-0 top-0 h-full w-full"
                style={{ overflow: 'visible' }}
            >
                <HeartBeam ref={beamRef} {...beamOptions} key={beamKey} />
            </svg>
        </>
    )
})

HeartBeamCollision.displayName = 'HeartBeamCollision'
