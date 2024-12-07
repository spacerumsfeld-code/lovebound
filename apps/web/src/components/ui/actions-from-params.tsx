'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { modalAtom, ModalType } from '@web/src/atoms/modal'
import { useSetAtom } from 'jotai'

export const ActionsFromParams = () => {
    // @State
    const searchParams = useSearchParams()
    const action = searchParams?.get('action') ?? ''
    const setModalToRender = useSetAtom(modalAtom)

    // @Ineractivity
    useEffect(() => {
        switch (action) {
            case 'modal.story.created':
                setModalToRender(ModalType.StoryCreated)
                break
            case 'modal.topup.success':
                setModalToRender(ModalType.ConfirmTopup)
                break
            case 'modal.subscription.success':
                setModalToRender(ModalType.ConfirmSubscription)
                break
            default:
                break
        }
    }, [action, setModalToRender])

    // @Render
    return <></>
}
