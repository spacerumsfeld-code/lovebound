'use client'

import { useAtomValue } from 'jotai'
import { modalAtom, ModalType } from '@web/src/atoms/modal'
import { AnimatedModalDemo } from '@web/src/app/dashboard/_components/modals/StoryCreated.modal'

export const Modal = () => {
    const modalToRender = useAtomValue(modalAtom)

    return (
        <>
            {(() => {
                switch (modalToRender) {
                    case ModalType.StoryCreated:
                        return <AnimatedModalDemo />
                    default:
                        return null
                }
            })()}
        </>
    )
}
