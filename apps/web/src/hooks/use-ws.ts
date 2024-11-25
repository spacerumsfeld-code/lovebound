'use client'

import { useEffect, useState } from 'react'

export const useWebsocket = (url: string) => {
    const [data, setData] = useState<any>(null)

    useEffect(() => {
        const socket = new WebSocket(`${url}?userId=1`)

        socket.onopen = () => {
            console.log('Connected to websocket')
        }

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data)
            setData(message)
        }

        socket.onclose = () => {
            console.log('Disconnected from websocket')
        }

        return () => {
            socket.close()
        }
    }, [url])

    return data
}
