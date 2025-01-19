import { Button } from '../../../components/ui/button'
import { Card, CardHeader, CardTitle } from '../../../components/ui/card'
import { ArrowRight, Book } from 'lucide-react'
import { Suspense } from 'react'
import { RecentStoriesAsync } from './RecentStories.async'
import { ScrollArea } from '../../../components/ui/scroll-area'
import { RecentStoriesSkeleton } from './RecentStories.skeleton'
import { SITE_MAP } from 'src/constants'

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
                    href={SITE_MAP.STORIES}
                    className="text-md hover:text-indigo-500 text-muted-foreground"
                >
                    View all
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
