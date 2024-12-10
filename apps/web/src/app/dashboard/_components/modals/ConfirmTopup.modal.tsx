'use client'

import React from 'react'
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
} from '@web/src/components/ui/animated-modal'
import Image from 'next/image'
import { Button } from '@web/src/components/ui/button'

export const ConfirmTopupModal = () => {
    // @Render
    return (
        <div className="py-40 flex items-center justify-center">
            <Modal isGlobal>
                <ModalBody>
                    <ModalContent className="flex flex-col items-center justify-center">
                        <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
                            Congratulations! Your credit balance has increased!
                        </h4>
                        <Image
                            alt="cool"
                            width="300"
                            height="400"
                            src="https://cdn.sanity.io/images/vjg0x5qe/production/5d14f71e88e0631774cdfdaec44dbcec02f81ce5-1024x1024.webp"
                            className="rounded-xl h-[400px] w-[300px] object-cover"
                        />

                        <p className="text-lg text-neutral-600 dark:text-neutral-100 text-center text-bold">
                            Your credits are available for immediate use on your
                            next fantastic story!
                        </p>
                    </ModalContent>
                    <ModalFooter className="flex gap-4">
                        <Button href="/dashboard/create">+ Create Story</Button>
                        <Button
                            href="/dashboard/shop"
                            className="bg-indigo-400 text-white"
                        >
                            Head to Shop
                        </Button>
                    </ModalFooter>
                </ModalBody>
            </Modal>
        </div>
    )
}
