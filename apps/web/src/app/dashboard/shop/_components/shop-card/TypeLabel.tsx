import { ItemTypeEnum } from '@client-types/item/item.model'
import { cn } from 'src/lib/utils'

const typeColorMap: Record<string, string> = {
    [ItemTypeEnum.Theme]: 'bg-indigo-500',
    [ItemTypeEnum.TensionLevel]: 'bg-rose-400',
    [ItemTypeEnum.Tone]: 'bg-violet-400',
    [ItemTypeEnum.Setting]: 'bg-indigo-400',
    [ItemTypeEnum.Length]: 'bg-slate-400',
}

export const TypeLabel = (props: { type: string }) => {
    return (
        <div
            className={cn(
                'absolute top-2 right-2 px-2 py-1 rounded-md text-sm font-medium text-white',
                typeColorMap[props.type],
            )}
        >
            {props.type}
        </div>
    )
}
