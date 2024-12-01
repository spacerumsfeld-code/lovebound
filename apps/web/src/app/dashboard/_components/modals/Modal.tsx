'use client'

import { useAtomValue } from 'jotai'
import { modalAtom, ModalType } from '@web/src/atoms/modal'
import { StoryCreatedModal } from '@web/src/app/dashboard/_components/modals/StoryCreated.modal'

export const Modal = () => {
    const modalToRender = useAtomValue(modalAtom)

    return (
        <>
            {(() => {
                switch (modalToRender) {
                    case ModalType.StoryCreated:
                        return <StoryCreatedModal />
                    default:
                        return null
                }
            })()}
        </>
    )
}
