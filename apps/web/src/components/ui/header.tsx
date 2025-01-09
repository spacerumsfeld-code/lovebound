import { ArrowRight, Sparkles } from 'lucide-react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from './card'
import { Button } from './button'
import { cn } from 'src/lib/utils'
import Link from 'next/link'

export const Header = (props: {
    title: string
    description: string
    ctaConfig?: {
        title: string
        href: string
        active?: boolean
    }[]
}) => {
    // @Render
    return (
        <Card className="bg-purple-50">
            <CardHeader>
                <CardTitle className="text-2xl">
                    <Sparkles className="inline-block mr-2" />
                    {props.title}
                </CardTitle>
                <CardDescription>{props.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-2">
                {props.ctaConfig?.map((cta, index) => (
                    <Button
                        variant="primary"
                        as={Link}
                        className={cn(
                            cta.active ? 'bg-indigo-500' : 'bg-indigo-300',
                        )}
                        href={cta.href}
                        key={index}
                    >
                        {cta.title}
                    </Button>
                ))}
            </CardContent>
        </Card>
    )
}
