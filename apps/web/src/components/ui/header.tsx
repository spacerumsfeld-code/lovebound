import { ArrowRight, Sparkles } from 'lucide-react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from './card'
import { Button } from './button'

export const Header = (props: {
    title: string
    description: string
    ctaConfig?: {
        title: string
        href: string
    }
}) => {
    return (
        <Card className="bg-purple-50">
            <CardHeader>
                <CardTitle className="text-2xl">
                    <Sparkles className="inline-block mr-2" />
                    {props.title}
                </CardTitle>
                <CardDescription>{props.description}</CardDescription>
            </CardHeader>
            <CardContent>
                {props.ctaConfig && (
                    <Button href={props.ctaConfig.href}>
                        {props.ctaConfig.title}
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </CardContent>
        </Card>
    )
}
