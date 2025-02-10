'use client'

import { NarrationVoiceEnum } from '@client-types/scene/scene.model'
import { Button } from 'src/components/ui/buttonTwo'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from 'src/components/ui/card'
import { Label } from 'src/components/ui/label'
import { ScrollArea } from 'src/components/ui/scroll-area'
import { useToast } from 'src/hooks/use-toast'
import { cn } from 'src/lib/utils'
import { useRef, useEffect } from 'react'
import { PlayIcon } from 'lucide-react'

export const NarrationOptions = (props: {
    selectedVoice: NarrationVoiceEnum | null
    narrationEnabled: boolean
    handleInputChange: (field: string, value: string | boolean) => void
}) => {
    // *Interactivity
    const { showToast } = useToast()

    const audioRef = useRef<HTMLAudioElement | null>(null)

    const handleVoiceClick = (value: string) => {
        if (!props.narrationEnabled) {
            showToast('❌ Narration is not currently enabled for this story.')
            return
        }
        props.handleInputChange('narrationVoice', value)
    }

    const handlePlaySample = (voice: string) => {
        if (audioRef.current) {
            audioRef.current.pause()
        }
        audioRef.current = new Audio(
            `https://cdn.openai.com/API/docs/audio/${voice}.wav`,
        )
        audioRef.current.play()
    }

    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause()
            }
        }
    }, [])

    // *Render
    return (
        <Card className="relative w-full md:w-80">
            <CardHeader>
                <CardTitle>Narration</CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[500px] pr-4">
                    <div className="space-y-4">
                        <Label>Voice Selection</Label>
                        {Object.entries(NarrationVoiceEnum).map(
                            ([key, value]) => (
                                <div
                                    key={value}
                                    className={cn(
                                        'flex items-center justify-between p-2 rounded-lg transition-colors',
                                        'hover:bg-indigo-50 active:bg-indigo-100',
                                        props.narrationEnabled &&
                                            props.selectedVoice === value
                                            ? 'bg-indigo-100 ring-2 ring-indigo-500 ring-offset-2'
                                            : 'bg-white',
                                    )}
                                >
                                    <div className="flex items-center space-x-3">
                                        <div>
                                            <div className="font-medium">
                                                {key}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                AI Voice
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handlePlaySample(value)
                                            }}
                                        >
                                            <PlayIcon className="h-4 w-4" />
                                        </Button>
                                        <div
                                            onClick={() =>
                                                handleVoiceClick(value)
                                            }
                                        >
                                            <Button
                                                disabled={
                                                    !props.narrationEnabled
                                                }
                                                variant="outline"
                                            >
                                                Select
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ),
                        )}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    )
}
