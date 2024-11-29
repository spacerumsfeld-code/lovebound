'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef, useCallback } from 'react'
import { useToast } from '@web/src/hooks/use-toast'
import { SITE_MAP } from '../constants'

export const useWebsocket = (url: string, userId: string) => {
    const router = useRouter()
    const { showToast } = useToast()
    const socketRef = useRef<WebSocket | null>(null)

    const handleMessage = useCallback(
        (event: MessageEvent) => {
            const message: {
                type: string
                payload: Record<string, any>
            } = JSON.parse(event.data)

            switch (message.type) {
                case 'scene.written':
                    console.info('Scene written in websocket!')
                    showToast(
                        `Good news! Scene ${message.payload.sceneNumber} has been written. Your story is almost complete!`,
                    )
                    break
                case 'story.complete':
                    showToast('Your story is complete!')
                    break
                default:
                    console.info('Unknown event type', message)
                    break
            }
        },
        [router, showToast],
    )

    useEffect(() => {
        if (!socketRef.current) {
            socketRef.current = new WebSocket(`${url}?userId=${userId}`)

            socketRef.current.onopen = () => {
                console.log('WebSocket connection established')
                showToast('WebSocket connected')
            }

            socketRef.current.onclose = () => {
                console.log('WebSocket connection closed')
                showToast('WebSocket disconnected', { type: 'error' })
            }

            socketRef.current.onerror = (error) => {
                console.error('WebSocket error:', error)
                showToast('WebSocket error occurred', { type: 'error' })
            }
        }

        socketRef.current.onmessage = handleMessage

        return () => {
            if (socketRef.current) {
                socketRef.current.close()
            }
        }
    }, [url, userId, handleMessage, showToast])
}
