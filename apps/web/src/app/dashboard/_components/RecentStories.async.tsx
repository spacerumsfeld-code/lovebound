import { Card, CardContent, CardHeader } from '@web/src/components/ui/card'
import { getRecentStories } from '../data'
import { ScrollArea } from '@web/src/components/ui/scroll-area'
import Image from 'next/image'

export const RecentStoriesAsync = async () => {
    // @Data
    const { recentStories } = await getRecentStories()

    // @Render
    if (!recentStories) {
        return <h3 className="text-lg font-semibold">No stories found</h3>
    }

    return (
        <div className="flex-1 overflow-hidden relative">
            <ScrollArea className="overflow-hidden h-[300px] w-[700px]">
                {recentStories.map((story) => (
                    <Card className="h-[200px] w-full">
                        <CardHeader>{story.title}</CardHeader>
                        <CardContent>
                            <Image
                                src={story.coverUrl!}
                                alt="Story Cover"
                                height="200"
                                width="600"
                                className="object-fit object-center h-full w-full object-cover"
                            />
                        </CardContent>
                    </Card>
                ))}
            </ScrollArea>
        </div>
    )
}
