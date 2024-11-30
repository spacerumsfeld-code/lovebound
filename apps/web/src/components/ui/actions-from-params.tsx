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
            default:
                break
        }
    }, [action])

    // @Render
    return <></>
}
