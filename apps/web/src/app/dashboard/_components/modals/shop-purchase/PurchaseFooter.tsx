import Link from 'next/link'
import { ModalFooter, useModal } from 'src/components/ui/animated-modal'
import { Button } from 'src/components/ui/button'

export const PurchaseFooter = () => {
    // *Interactivity
    const { setOpen } = useModal()

    // *Render
    return (
        <ModalFooter className="flex gap-4">
            <Button as={Link} href="/dashboard/shop" onClick={() => setOpen()}>
                Keep Shopping
            </Button>
            <Button
                as={Link}
                onClick={() => setOpen()}
                href="/dashboard/create"
                className="bg-indigo-400 text-white"
            >
                Create Story
            </Button>
        </ModalFooter>
    )
}
