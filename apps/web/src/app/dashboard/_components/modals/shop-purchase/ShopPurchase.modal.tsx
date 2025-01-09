'use client'

import React from 'react'
import {
    Modal,
    ModalBody,
    ModalContent,
} from '../../../../../components/ui/animated-modal'
import { PurchaseFooter } from './PurchaseFooter'

export const ConfirmShopPurchaseModal = () => {
    // *Render
    return (
        <div className="py-40 flex items-center justify-center">
            <Modal isGlobal>
                <ModalBody>
                    <ModalContent>
                        <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
                            Congratulations! You have successfully made a
                            purchase! Your item is now available for immediate
                            use on your next fantastic story.
                        </h4>
                    </ModalContent>
                    <PurchaseFooter />
                </ModalBody>
            </Modal>
        </div>
    )
}
