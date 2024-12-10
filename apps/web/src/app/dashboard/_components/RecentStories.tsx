import { Button } from '../../../components/ui/buttonTwo'
import { Card, CardHeader, CardTitle } from '../../../components/ui/card'
import { ArrowRight, Book } from 'lucide-react'
import { Suspense } from 'react'
import { RecentStoriesAsync } from './RecentStories.async'
import { ScrollArea } from '../../../components/ui/scroll-area'
import { RecentStoriesSkeleton } from './RecentStories.skeleton'

export const RecentStories = () => {
    // @Render
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm flex items-center">
                    <Book className="h-8 w-8" />
                    Recent stories
                </CardTitle>
                <Button
                    variant="link"
                    className="text-sm text-muted-foreground"
                >
                    View all
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </CardHeader>

            <ScrollArea className="h-[400px]">
                <Suspense fallback={<RecentStoriesSkeleton size={10} />}>
                    <RecentStoriesAsync />
                </Suspense>
            </ScrollArea>
        </Card>
    )
}
