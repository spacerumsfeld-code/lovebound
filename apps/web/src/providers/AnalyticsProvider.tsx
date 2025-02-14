import { PHProvider } from './PHProvider'
import { currentUser } from '@clerk/nextjs/server'

export const AnalyticsProvider = async (props: {
    children: React.ReactNode
}) => {
    // @Data
    const user = await currentUser()

    // @Render
    return <PHProvider userId={user?.id ?? null}>{props.children}</PHProvider>
}
