import { cn } from 'src/lib/utils'

export const TitleLabel = (props: { title: string }) => {
    return (
        <div
            className={cn(
                'absolute bottom-2 left-2 px-2 py-1 rounded-md font-medium text-lg text-white bg-black/50',
            )}
        >
            {props.title}
        </div>
    )
}
