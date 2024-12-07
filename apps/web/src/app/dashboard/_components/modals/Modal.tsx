'use client'

import { useAtomValue } from 'jotai'
import { modalAtom, ModalType } from '@web/src/atoms/modal'
import { StoryCreatedModal } from '@web/src/app/dashboard/_components/modals/StoryCreated.modal'
import { ConfirmTopupModal } from './ConfirmTopup.modal'

export const Modal = () => {
    const modalToRender = useAtomValue(modalAtom)
    console.info('modalToRender', modalToRender, ModalType.ConfirmTopup)

    return (
        <>
            {(() => {
                switch (modalToRender) {
                    case ModalType.StoryCreated:
                        return <StoryCreatedModal />
                    case ModalType.ConfirmTopup:
                        return <ConfirmTopupModal />
                    case ModalType.ConfirmSubscription:
                        return null
                    default:
                        return null
                }
            })()}
        </>
    )
}
