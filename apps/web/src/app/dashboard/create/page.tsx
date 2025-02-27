import { Metadata } from 'next'
import { CreateStoryPage } from './_components/CreateStory.page'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: 'Create Story',
}

export default CreateStoryPage
