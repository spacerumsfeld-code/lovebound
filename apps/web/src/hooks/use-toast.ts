import { toast } from 'sonner'
import { useCallback } from 'react'

export const useToast = () => {
    const showToast = useCallback((message: string, options?: any) => {
        toast(message, options)
    }, [])

    return { showToast }
}
