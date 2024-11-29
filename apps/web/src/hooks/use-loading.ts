import { useState } from 'react'

interface LoadingStates {
    [key: string]: boolean
}

function useLoading() {
    const [loadingStates, setLoadingStates] = useState({} as LoadingStates)

    const startLoading = (id: string) => {
        setLoadingStates((prevStates: LoadingStates) => ({
            ...prevStates,
            [id]: true,
        }))
    }

    const stopLoading = (id: string) => {
        setLoadingStates((prevStates: LoadingStates) => ({
            ...prevStates,
            [id]: false,
        }))
    }

    const isLoading = (id: string) => {
        return loadingStates[id] ?? false
    }

    return { isLoading, startLoading, stopLoading }
}

export default useLoading
