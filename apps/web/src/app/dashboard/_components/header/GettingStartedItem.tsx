import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { SITE_MAP } from 'src/constants'
import { ItemAsync } from './Item.async'
import { Suspense } from 'react'
import { LinkEnum } from './DashboardHeader'

export const GettingStartedItem = (props: {
    link: { id: LinkEnum; title: string; description: string; href: SITE_MAP }
}) => {
    return (
        <Link
            key={props.link.href}
            href={props.link.href}
            className="group p-4 border rounded-lg hover:bg-purple-50 transition-colors relative"
        >
            <div className="flex items-center gap-4">
                <Suspense fallback="Ayyyyyyyyy">
                    <ItemAsync linkId={props.link.id} />
                </Suspense>
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
