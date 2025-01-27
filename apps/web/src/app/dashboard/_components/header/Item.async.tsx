import { CheckCircle, Circle } from 'lucide-react'
import { getGettingStartedFields } from '../../data'
import { GettingStartedLinkId } from './DashboardHeader'

export const ItemAsync = async (props: { linkId: GettingStartedLinkId }) => {
    // *Data
    const { gettingStartedFields } = await getGettingStartedFields()

    // *Render
    return (
        <>
            {gettingStartedFields[props.linkId] ? (
                <CheckCircle
                    className="h-5 w-5 text-green-300 stroke-2"
                    strokeWidth={2}
                />
            ) : (
                <Circle
                    className="h-5 w-5 text-gray-300 stroke-2"
                    strokeWidth={2}
                />
            )}
        </>
    )
}
