'use client'

import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
} from '../../../../components/ui/animated-modal'
import { Button } from '../../../../components/ui/button'
import { OptimizedImage } from 'src/components/ui/image/optimized-image'

export const ConfirmSubscriptionModal = () => {
    // *Render
    return (
        <div className="py-20 sm:py-40 flex items-center justify-center">
            <Modal isGlobal>
                <ModalBody>
                    <ModalContent className="flex flex-col items-center justify-center p-4">
                        <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-4 md:mb-8">
                            Congratulations! Your subscription is active!
                        </h4>
                        <OptimizedImage
                            alt="Subscription Active"
                            height={400}
                            width={300}
                            src="https://cdn.sanity.io/images/vjg0x5qe/production/5d14f71e88e0631774cdfdaec44dbcec02f81ce5-1024x1024.webp"
                            className="rounded-xl h-[250px] md:h-[400px] w-[200px] md:w-[300px] object-cover"
                        />
                        <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-100 text-center text-bold mt-4">
                            Enjoy access to additional features with no
                            obligation and cancel at any time.
                        </p>
                    </ModalContent>
                    <ModalFooter className="flex flex-col sm:flex-row gap-4 p-4">
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
