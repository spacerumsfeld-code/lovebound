'use client'

import { useAtomValue } from 'jotai'
import { modalAtom, ModalType } from '../../../../atoms/modal'
import { StoryCreatedModal } from './StoryCreated.modal'
import { ConfirmTopupModal } from './ConfirmTopup.modal'

export const Modal = () => {
    const modalToRender = useAtomValue(modalAtom)

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
