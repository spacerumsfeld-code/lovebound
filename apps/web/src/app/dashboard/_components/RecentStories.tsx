import { Button } from '@web/src/components/ui/buttonTwo'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@web/src/components/ui/card'
import { ArrowRight, Book } from 'lucide-react'
import { Suspense } from 'react'
import { RecentStoriesAsync } from './RecentStories.async'

export const RecentStories = () => {
    // @Render
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
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
            <CardContent>
                <div className="flex flex-col items-center justify-center space-y-4 py-8">
                    <Suspense fallback={<div>Loading...</div>}>
                        <RecentStoriesAsync />
                    </Suspense>
                </div>
            </CardContent>
        </Card>
    )
}
