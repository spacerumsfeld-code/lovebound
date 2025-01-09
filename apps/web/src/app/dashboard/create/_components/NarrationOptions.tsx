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
import { cn } from 'src/lib/utils'

export const NarrationOptions = (props: {
    selectedVoice: NarrationVoiceEnum
    narrationEnabled: boolean
    handleInputChange: (field: string, value: string | boolean) => void
}) => {
    return (
        <Card className="w-80">
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
                                        'flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg',
                                        props.narrationEnabled &&
                                            props.selectedVoice === value &&
                                            'border-indigo-400 border outline',
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
                                    <Button
                                        disabled={!props.narrationEnabled}
                                        onClick={() =>
                                            props.handleInputChange(
                                                'narrationVoice',
                                                value,
                                            )
                                        }
                                        variant="outline"
                                        size="sm"
                                    >
                                        Select
                                    </Button>
                                </div>
                            ),
                        )}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    )
}
