'use client'

import React from 'react'
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
} from '@web/src/components/ui/animated-modal'
import Image from 'next/image'
import { motion } from 'framer-motion'

export const StoryCreatedModal = () => {
    const images = [
        'https://cdn.sanity.io/images/vjg0x5qe/production/1c6a26521d9c96079c4517179f6654edf550542e-1024x1024.webp',
        'https://cdn.sanity.io/images/vjg0x5qe/production/d57a81d5388f6acd71a67db0c289c7ae9592c7c4-1024x1024.webp',
        'https://cdn.sanity.io/images/vjg0x5qe/production/15c91e075e26d6ac02666769feeeeae45a9834db-1024x1024.webp',
        'https://cdn.sanity.io/images/vjg0x5qe/production/52dcbabf5144d40c1cd267fabd65ddee66a73551-1024x1024.webp',
        'https://cdn.sanity.io/images/vjg0x5qe/production/f9ad22469b791790c454e0da7dcf486523a6fd47-1024x1024.webp',
    ]

    return (
        <div className="py-40 flex items-center justify-center">
            <Modal isGlobal>
                <ModalBody>
                    <ModalContent>
                        <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
                            Congratulations! You have successfully created your
                            story!
                        </h4>
                        <div className="flex justify-center items-center">
                            {images.map((image, idx) => (
                                <motion.div
                                    key={'images' + idx}
                                    style={{
                                        rotate: Math.random() * 20 - 10,
                                    }}
                                    whileHover={{
                                        scale: 1.1,
                                        rotate: 0,
                                        zIndex: 100,
                                    }}
                                    whileTap={{
                                        scale: 1.1,
                                        rotate: 0,
                                        zIndex: 100,
                                    }}
                                    className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 flex-shrink-0 overflow-hidden"
                                >
                                    <Image
                                        src={image}
                                        alt="bali images"
                                        width="500"
                                        height="500"
                                        className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0"
                                    />
                                </motion.div>
                            ))}
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-6 items-start justify-start max-w-sm mx-auto">
                            <div className="flex flex-col items-center justify-center">
                                <p className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
                                    Really compelling copy here and a few links.
                                </p>
                            </div>
                        </div>
                    </ModalContent>
                </ModalBody>
            </Modal>
        </div>
    )
}