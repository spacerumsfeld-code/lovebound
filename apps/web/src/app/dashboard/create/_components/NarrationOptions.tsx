'use client'

import { Avatar, AvatarFallback, AvatarImage } from 'src/components/ui/avatar'
import { Button } from 'src/components/ui/buttonTwo'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from 'src/components/ui/card'
import { Label } from 'src/components/ui/label'
import { ScrollArea } from 'src/components/ui/scroll-area'

export const NarrationOptions = () => {
    return (
        <Card className="w-80">
            <CardHeader>
                <CardTitle>Narration</CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[500px] pr-4">
                    <div className="space-y-4">
                        <Label>Voice Selection</Label>
                        {[
                            'Alloy',
                            'Echo',
                            'Fable',
                            'Onyx',
                            'Nova',
                            'Shimmer',
                        ].map((voice) => (
                            <div
                                key={voice}
                                className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg"
                            >
                                <div className="flex items-center space-x-3">
                                    <Avatar>
                                        <AvatarImage
                                            src={`/placeholder.svg?height=40&width=40&text=${encodeURIComponent(
                                                voice[0],
                                            )}`}
                                        />
                                        <AvatarFallback>
                                            {voice[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-medium">
                                            {voice}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            AI Voice
                                        </div>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm">
                                    Select
                                </Button>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    )
}
