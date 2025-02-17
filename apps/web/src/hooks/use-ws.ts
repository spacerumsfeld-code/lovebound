import { useEffect, useRef, useCallback } from 'react'
import { useToast } from '../hooks/use-toast'

export const useWebsocket = (url: string, userId: string) => {
    const { showToast } = useToast()
    const socketRef = useRef<WebSocket | null>(null)

    const handleMessage = useCallback(
        (event: MessageEvent) => {
            const message: {
                type: string
                payload: Record<string, object | string | boolean | number>
            } = JSON.parse(event.data)

            const allowedNotifications = new Set<string>([
                'scene.written',
                'story.complete',
                'cover.created',
            ])
            if (allowedNotifications.has(message.type)) {
                switch (message.type) {
                    case 'scene.written':
                        if (message.payload.length === 'Mini')
                            showToast(
                                `🖊️ Your story\'s content has been written!`,
                            )

                        if (message.payload.length === 'Short') {
                            if (message.payload.sceneNumber === 1)
                                showToast(
                                    `🖊️ Your story\'s first scene has been written!`,
                                )

                            if (message.payload.sceneNumber === 2)
                                showToast(
                                    `🖊️ Your story\'s second scene has been written! Your story is almost complete!`,
                                )

                            if (message.payload.sceneNumber === 3)
                                showToast(
                                    `🖊️ Your story\'s final scene has been written!`,
                                )
                        }
                        break
                    case 'cover.created':
                        showToast("🖊️ Your story's cover has been created!")
                        break
                    case 'story.complete':
                        showToast('🖊️ Good news! Your story is complete!')
                        break
                }
            }
        },
        [showToast],
    )

    useEffect(() => {
        if (!userId) {
            return
        }

        if (!socketRef.current) {
            socketRef.current = new WebSocket(`${url}?userId=${userId}`)

            // socketRef.current.onopen = () => {
            //     showToast('WebSocket connected')
            // }

            // socketRef.current.onclose = () => {
            //     showToast('WebSocket disconnected')
            // }

            // socketRef.current.onerror = () => {
            //     showToast('WebSocket error occurred')
            // }
        }

        socketRef.current.onmessage = handleMessage

        return () => {
            if (socketRef.current) {
                socketRef.current.close()
            }
        }
    }, [url, userId, handleMessage, showToast])
}
