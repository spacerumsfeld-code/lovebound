import { Button } from '@web/src/components/ui/buttonTwo'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@web/src/components/ui/card'
import { ArrowRight, Sparkles } from 'lucide-react'
import { RecentStories } from './RecentStories'

export const DashboardPage = () => {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6 max-w-7xl mx-auto">
            <Card className="bg-purple-50">
                <CardHeader>
                    <CardTitle className="text-2xl">
                        <Sparkles className="inline-block mr-2" />
                        Auto-Pilot Content for TikTok & YouTube
                    </CardTitle>
                    <CardDescription>
                        Sit back as fresh, engaging content is created and
                        posted to your channels around the clock. Automate your
                        success with Series.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button>
                        Start a Series
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </CardContent>
            </Card>

            <RecentStories />
        </div>
    )
}
