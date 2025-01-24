import { CheckCircle, Circle } from 'lucide-react'
import { getGettingStartedFields } from '../../data'

export const ItemAsync = async (props: { linkId: string }) => {
    // *Data
    const { gettingStartedFields } = await getGettingStartedFields()

    // *Render
    return (
        <div className="flex-shrink-0">
            {gettingStartedFields[
                props.linkId as keyof typeof gettingStartedFields
            ] ? (
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
        </div>
    )
}
