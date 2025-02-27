import { Metadata } from 'next'
import { StoriesPage } from './_components/Stories.page'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: 'Stories',
}

export default StoriesPage
