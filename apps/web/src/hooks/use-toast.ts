import { toast } from 'sonner'
import { useCallback } from 'react'

export const useToast = () => {
    const showToast = useCallback((message: string) => {
        toast(message)
    }, [])

    return { showToast }
}
