'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { SITE_MAP } from '../constants'

export const useWebsocket = (url: string, userId: string) => {
    const router = useRouter()

    useEffect(() => {
        const socket = new WebSocket(`${url}?userId=${userId}`)

        socket.onopen = () => {
            console.log('Connected to websocket')
        }

        socket.onmessage = (event) => {
            const message: {
                type: string
                data: Record<string, any>
            } = JSON.parse(event.data)
            switch (message.type) {
                case 'story.created':
                    toast.success('Your story has been created!', {
                        action: {
                            label: 'View Story',
                            onClick: () => router.push(SITE_MAP.STORIES),
                        },
                    })
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
