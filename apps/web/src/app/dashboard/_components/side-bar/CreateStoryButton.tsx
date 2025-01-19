'use client'

import Link from 'next/link'
import { Button } from 'src/components/ui/button'
import { useSidebar } from 'src/components/ui/sidebar'

export const CreateStoryButton = () => {
    // *State
    const { open } = useSidebar()

    // *Render
    return (
        <Button
            as={Link}
            href="/dashboard/create"
            className="flex items-center justify-center"
        >
            {open ? 'Create Story' : '+'}
        </Button>
    )
}
