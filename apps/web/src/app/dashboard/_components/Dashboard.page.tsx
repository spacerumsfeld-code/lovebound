import { DashboardHeader } from './DashboardHeader'
import { RecentStories } from './RecentStories'

export const DashboardPage = () => {
    return (
        <main className="space-y-4 p-8 pt-6 max-w-7xl mx-auto">
            <DashboardHeader />
            <RecentStories />
        </main>
    )
}
