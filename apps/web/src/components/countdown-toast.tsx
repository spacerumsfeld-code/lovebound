'use client'

import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface CountdownToastProps {
    message: string
    duration: number
}

const CountdownToast: React.FC<CountdownToastProps> = ({
    message,
    duration,
}) => {
    const [progress, setProgress] = useState(100)

    useEffect(() => {
        const startTime = Date.now()
        const endTime = startTime + duration

        const updateProgress = () => {
            const now = Date.now()
            const remaining = endTime - now
            const newProgress = (remaining / duration) * 100

            if (remaining <= 0) {
                setProgress(0)
                return
            }

            setProgress(newProgress)
            requestAnimationFrame(updateProgress)
        }

        const animationFrame = requestAnimationFrame(updateProgress)
        return () => cancelAnimationFrame(animationFrame)
    }, [duration])

    return (
        <div className="min-w-[320px] bg-white rounded-lg shadow-lg p-4 pointer-events-auto relative overflow-hidden">
            <div className="text-[15px] font-medium text-gray-950">
                {message}
            </div>
            <div
                className="absolute bottom-0 left-0 h-[3px] bg-green-400 transition-all ease-linear"
                style={{
                    width: `${progress}%`,
                    right: 0,
                    transform: `translateX(${progress - 100}%)`,
                }}
            />
        </div>
    )
}

export const showCountdownToast = (
    message: string,
    duration: number = 15000,
) => {
    toast.custom(
        () => <CountdownToast message={message} duration={duration} />,
        {
            duration,
            className: 'p-0 bg-transparent shadow-none',
        },
    )
}
