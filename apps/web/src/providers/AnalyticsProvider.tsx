import { PHProvider } from './PHProvider'
import { currentUser } from '@clerk/nextjs/server'

export const AnalyticsProvider = async (props: {
    children: React.ReactNode
}) => {
    // @Data
    const user = await currentUser()
    console.info('do we run?', user)

    // @Render
    return <PHProvider userId={user?.id ?? ''}>{props.children}</PHProvider>
}
