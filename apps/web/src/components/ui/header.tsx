import { Sparkles } from 'lucide-react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from './card'
import { cn } from 'src/lib/utils'

export const Header = (props: {
    title: string
    description: string
    children?: React.ReactNode
    className?: string
}) => {
    // @Render
    return (
        <Card className={cn('bg-purple-50', props.className)}>
            <CardHeader>
                <CardTitle className="text-2xl">
                    <Sparkles className="inline-block mr-2" />
                    {props.title}
                </CardTitle>
                <CardDescription>{props.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-2">
                {props.children}
            </CardContent>
        </Card>
    )
}
