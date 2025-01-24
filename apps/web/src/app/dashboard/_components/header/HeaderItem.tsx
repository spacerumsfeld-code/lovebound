import Link from 'next/link'
import { SITE_MAP } from 'src/constants'
import { ArrowRight, Circle } from 'lucide-react'
import { ItemAsync } from './Item.async'
import { GettingStartedLinkId } from './DashboardHeader'
import { Suspense } from 'react'

export const HeaderItem = (props: {
    link: {
        id: GettingStartedLinkId
        title: string
        description: string
        href: SITE_MAP
    }
}) => {
    // *Render
    return (
        <Link
            key={props.link.href}
            href={props.link.href}
            className="group p-4 border rounded-lg hover:bg-purple-50 transition-colors relative"
        >
            <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                    <Suspense
                        fallback={
                            <Circle
                                className="h-5 w-5 text-gray-300 stroke-2"
                                strokeWidth={2}
                            />
                        }
                    >
                        <ItemAsync linkId={props.link.id} />
                    </Suspense>
                </div>
                <div className="flex-grow">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">
                        {props.link.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {props.link.description}
                    </p>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
            </div>
        </Link>
    )
}
