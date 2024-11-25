'use client'

import { useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { useEffect } from 'react'
import { showCountdownToast } from '../countdown-toast'

export const ToastFromParams = () => {
    // @State
    const searchParams = useSearchParams()
    const message = searchParams?.get('toast') ?? ''

    /** Interactivity */
    useEffect(() => {
        switch (message) {
            case 'story-submitted':
                showCountdownToast('Story submitted successfully', 30000)
                break
            default:
                break
        }
    }, [message])

    /** Render */
    return <></>
}
