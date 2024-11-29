import { toast } from 'sonner'
import { useCallback } from 'react'

export const useToast = () => {
    const showToast = useCallback((message: string, options?: any) => {
        toast(message, options)
    }, [])

    console.info('why the fuck arent we working?')

    return { showToast }
}
