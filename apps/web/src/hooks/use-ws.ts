'use client'

import { useEffect } from 'react'
import { toast } from 'sonner'

export const useWebsocket = (url: string, userId: string) => {
    useEffect(() => {
        const socket = new WebSocket(`${url}?userId=${userId}`)

        socket.onopen = () => {
            console.log('Connected to websocket')
        }

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data)
            switch (event.data.type) {
                case 'story.created':
                    toast.success('Story Created! Waiting for cover story...')
                    console.info('story.created', message)
                    break
                case 'story.cover.generated':
                    console.info('story.cover.generated', message)
                    break
                default:
                    console.info('Unknown event type', message)
                    break
            }
        }

        socket.onclose = () => {
            console.log('Disconnected from websocket')
        }

        return () => {
            socket.close()
        }
    }, [url])
}
