import { getCurrentUser } from 'src/app/data'
import { PHProvider } from './PHProvider'

export const AnalyticsProvider = async (props: {
    children: React.ReactNode
}) => {
    // @Data
    const { user } = await getCurrentUser()

    // @Render
    return <PHProvider userId={user?.id ?? ''}>{props.children}</PHProvider>
}
