'use client'

import { useEffect, useRef, useCallback } from 'react'
import { useToast } from '@web/src/hooks/use-toast'

export const useWebsocket = (url: string, userId: string) => {
    const { showToast } = useToast()
    const socketRef = useRef<WebSocket | null>(null)

    const handleMessage = useCallback(
        (event: MessageEvent) => {
            const message: {
                type: string
                payload: Record<string, object | string | boolean | number>
            } = JSON.parse(event.data)

            switch (message.type) {
                case 'scene.written':
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
        [showToast],
    )

    useEffect(() => {
        if (!socketRef.current) {
            socketRef.current = new WebSocket(`${url}?userId=${userId}`)

            socketRef.current.onopen = () => {
                showToast('WebSocket connected')
            }

            socketRef.current.onclose = () => {
                showToast('WebSocket disconnected')
            }

            socketRef.current.onerror = () => {
                showToast('WebSocket error occurred')
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
