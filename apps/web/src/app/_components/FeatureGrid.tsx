'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { cn } from 'src/lib/utils'
import { BentoGrid, BentoGridItem } from 'src/components/ui/bento-grid'
import {
    IconClipboardCopy,
    IconFileBroken,
    IconSignature,
    IconTableColumn,
    IconBoxAlignRightFilled,
} from '@tabler/icons-react'
import { Logo } from './logo'

export const FeatureGrid = () => {
    return (
        <div className="py-16">
            <div id="features">
                <h4 className="text-gray-700 mb-8 text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium">
                    Core Features
                </h4>
            </div>
            <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
                {items.map((item, i) => (
                    <BentoGridItem
                        key={i}
                        title={item.title}
                        description={item.description}
                        header={item.header}
                        className={cn('[&>p:text-lg]', item.className)}
                        icon={item.icon}
                    />
                ))}
            </BentoGrid>
        </div>
    )
}

const SkeletonOne = () => {
    const words = [
        'Their eyes met across the crowded room...',
        'She could not contain herself any longer...',
        'The tension was palpable...',
    ]

    const containerVariants = {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
    }

    const textVariants = {
        initial: { opacity: 0, y: 10 },
        animate: (i: number) => ({
            opacity: [0, 1, 1, 0],
            y: [10, 0, 0, -10],
            transition: {
                duration: 3,
                delay: i * 3,
                repeat: Infinity,
                repeatDelay: (words.length - 1) * 3,
            },
        }),
    }

    return (
        <motion.div
            initial="initial"
            animate="animate"
            variants={containerVariants}
            className="flex flex-1 w-full h-full min-h-[6rem] flex-col items-center justify-center p-4"
        >
            <div className="bg-white dark:bg-black rounded-lg p-4 w-full max-w-[90%] relative">
                {words.map((word, i) => (
                    <motion.div
                        key={word}
                        custom={i}
                        variants={textVariants}
                        initial="initial"
                        animate="animate"
                        className="absolute text-sm text-gray-800 dark:text-gray-200 font-medium"
                    >
                        {word}
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}

const SkeletonTwo = () => {
    const sliderVariants = {
        initial: {
            width: '40%',
            x: 0,
        },
        animate: (i: number) => ({
            width: ['40%', '80%', '60%'],
            x: [0, 10, 0],
            transition: {
                duration: 2,
                delay: i * 0.3,
                repeat: Infinity,
                repeatType: 'reverse',
            },
        }),
    }

    const labels = ['Setting: Medieval Scotland', 'Fantasy Elements', 'Tension']

    return (
        <motion.div
            initial="initial"
            animate="animate"
            className="flex flex-1 w-full h-full min-h-[6rem] flex-col space-y-4 p-6"
        >
            {labels.map((label, i) => (
                <div key={i} className="space-y-2">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                        {label}
                    </div>
                    <div className="relative h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                            custom={i}
                            variants={sliderVariants}
                            className="absolute h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                        />
                    </div>
                </div>
            ))}
        </motion.div>
    )
}

const SkeletonThree = () => {
    const variants = {
        initial: {
            backgroundPosition: '0 50%',
            scale: 1,
        },
        animate: {
            backgroundPosition: ['0 50%', '100% 50%', '0 50%'],
            scale: [
                1, // start
                1.03, // pulse 1 (rapid phase)
                1,
                1.03, // pulse 2
                1,
                1.03, // pulse 3
                1,
                1.03, // pulse 4
                1,
                1.03, // pulse 5
                1,
                1.03, // pulse 6 (slower phase)
                1,
                1,
                1.03, // pulse 7
                1,
                1,
                1.03, // pulse 8
                1, // end
            ],
            transition: {
                backgroundPosition: {
                    duration: 5,
                    repeat: Infinity,
                    repeatType: 'reverse',
                },
                scale: {
                    duration: 5,
                    times: [
                        0, // start
                        0.12, // slightly less rapid pulses
                        0.18,
                        0.24,
                        0.3,
                        0.36,
                        0.42,
                        0.48,
                        0.54,
                        0.6,
                        0.66,
                        0.72, // slower pulses
                        0.76,
                        0.82,
                        0.86,
                        0.9,
                        0.94,
                        0.97,
                        1,
                    ],
                    repeat: Infinity,
                    repeatType: 'reverse',
                },
            },
        },
    }
    return (
        <motion.div
            initial="initial"
            animate="animate"
            variants={variants}
            className="flex flex-1 w-full h-full min-h-[6rem]  rounded-lg  flex-col space-y-2"
            style={{
                background:
                    'linear-gradient(-45deg, #ff0844, #ff4563, #ff6b8b, #ff8da8)',
                backgroundSize: '400% 400%',
            }}
        >
            <motion.div className="h-full w-full rounded-lg"></motion.div>
        </motion.div>
    )
}

const SkeletonFour = () => {
    const first = {
        initial: {
            x: 20,
            rotate: -5,
        },
        hover: {
            x: 0,
            rotate: 0,
        },
    }
    const second = {
        initial: {
            x: -20,
            rotate: 5,
        },
        hover: {
            x: 0,
            rotate: 0,
        },
    }
    return (
        <motion.div
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="flex flex-1 w-full h-full min-h-[6rem] flex-row space-x-2"
        >
            <motion.div
                variants={first}
                className="h-full w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
            >
                <Image
                    src="https://cdn.sanity.io/images/vjg0x5qe/production/78df376a163586df790bbc579014851971b2964b-1024x1024.webp"
                    alt="Story cover"
                    height="100"
                    width="100"
                    className="rounded-lg h-10 w-10 object-cover"
                />
                <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
                    Midnight in Manhattan
                </p>
                <p className="border border-rose-500 bg-rose-100 dark:bg-rose-900/20 text-rose-600 text-xs rounded-full px-2 py-0.5 mt-4">
                    Romance
                </p>
            </motion.div>
            <motion.div className="h-full relative z-20 w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center">
                <Image
                    src="https://cdn.sanity.io/images/vjg0x5qe/production/0853a7dd606ac5bb022130f96e10771476bfa910-1024x1024.webp"
                    alt="Story cover"
                    height="100"
                    width="100"
                    className="rounded-lg h-10 w-10 object-cover"
                />
                <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
                    Highland Magic
                </p>
                <p className="border border-green-500 bg-green-100 dark:bg-green-900/20 text-green-600 text-xs rounded-full px-2 py-0.5 mt-4">
                    Fantasy Romance
                </p>
            </motion.div>
            <motion.div
                variants={second}
                className="h-full w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
            >
                <Image
                    src="https://cdn.sanity.io/images/vjg0x5qe/production/c0edae14dfa508ada4364ef1a260ad0b16b945b3-1024x1024.webp"
                    alt="Story cover"
                    height="100"
                    width="100"
                    className="rounded-lg h-10 w-10 object-cover"
                />
                <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
                    Starship Love
                </p>
                <p className="border border-purple-500 bg-purple-100 dark:bg-purple-900/20 text-purple-600 text-xs rounded-full px-2 py-0.5 mt-4">
                    Sci-fi Romance
                </p>
            </motion.div>
        </motion.div>
    )
}

const SkeletonFive = () => {
    const variants = {
        initial: {
            x: 0,
        },
        animate: {
            x: 10,
            rotate: 5,
            transition: {
                duration: 0.2,
            },
        },
    }
    const variantsSecond = {
        initial: {
            x: 0,
        },
        animate: {
            x: -10,
            rotate: -5,
            transition: {
                duration: 0.2,
            },
        },
    }

    return (
        <motion.div
            initial="initial"
            whileHover="animate"
            className="flex flex-1 w-full h-full min-h-[6rem] flex-col space-y-2"
        >
            <motion.div
                variants={variants}
                className="flex flex-row rounded-2xl border border-neutral-100 dark:border-white/[0.2] p-2 items-start space-x-2 bg-white dark:bg-black"
            >
                <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
                <p className="text-xs text-neutral-500">
                    Looking for a steamy romance with vampires in Victorian
                    London...
                </p>
            </motion.div>
            <motion.div
                variants={variantsSecond}
                className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center justify-end space-x-2 w-3/4 ml-auto bg-white dark:bg-black"
            >
                <p className="text-xs text-neutral-500">Say no more! 🧛‍♂️</p>
                <Logo height={40} width={40} />
            </motion.div>
        </motion.div>
    )
}

const items = [
    {
        title: 'Generative AI',
        description: (
            <span className="text-sm">
                Use our AI to generate your unique stories.
            </span>
        ),
        header: <SkeletonOne />,
        className: 'md:col-span-1',
        icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: 'Control',
        description: (
            <span className="text-sm">
                You decide what you want your story to be.
            </span>
        ),
        header: <SkeletonTwo />,
        className: 'md:col-span-1',
        icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: 'As Hot as You Want',
        description: (
            <span className="text-sm">
                Set the tension and intensity of your story - from light to
                fully explicit.
            </span>
        ),
        header: <SkeletonThree />,
        className: 'md:col-span-1',
        icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: 'Ownership',
        description: (
            <span className="text-sm">
                You retain full ownership of your library, forever.
            </span>
        ),
        header: <SkeletonFour />,
        className: 'md:col-span-2',
        icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: 'Variety',
        description: (
            <span className="text-sm">
                Combining genres, themes, settings, tones, and tension levels,
                you might never run out of material.
            </span>
        ),
        header: <SkeletonFive />,
        className: 'md:col-span-1',
        icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
    },
]
