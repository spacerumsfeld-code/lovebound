import { RecentStories } from './RecentStories'
import { Header } from 'src/components/ui/header'

export const DashboardPage = () => {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6 max-w-7xl mx-auto">
            <Header
                title="Recent Stories"
                description="  Sit back as fresh, engaging content is created and
                        posted to your channels around the clock. Automate your
                        success with Series."
            />
            <RecentStories />
        </div>
    )
}
