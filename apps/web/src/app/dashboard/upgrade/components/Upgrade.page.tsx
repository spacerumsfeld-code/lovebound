import { UpgradeHeader } from './UpgradeHeader'
import { PayAsYouGo } from './PayAsYouGo'
import { Subscriptions } from './Subscriptions'

export const UpgradePage = () => {
    // @Render
    return (
        <div className="container max-w-6xl mx-auto px-4 py-8">
            <UpgradeHeader />
            <div className="grid gap-8 mb-12">
                <PayAsYouGo />
                <Subscriptions />
            </div>
        </div>
    )
}
