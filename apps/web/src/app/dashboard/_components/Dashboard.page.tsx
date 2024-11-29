import { Button } from '@web/src/components/ui/buttonTwo'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@web/src/components/ui/card'
import { ArrowRight, Film, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { SITE_MAP } from '@web/src/constants'

export const DashboardPage = () => {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
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

            <Link href={SITE_MAP.CREATE}>
                <div className="flex justify-between items-center">
                    <Button>+ Create Story</Button>
                </div>
            </Link>

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
                        <div className="rounded-full bg-gray-100 p-4">
                            <Film className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold">
                            No stories found
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            You haven't created any stories yet.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
