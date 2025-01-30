'use client'

import { SidebarMenuButton } from 'src/components/ui/sidebar'
import { CreditCard } from 'lucide-react'
import { useToast } from 'src/hooks/use-toast'

export const NotInStripeLink = () => {
    // *Interactivity
    const { showToast } = useToast()
    const handleClick = () => {
        showToast(
            '❗ You will be able to view Billing details once you make a purchase.',
        )
    }

    // *Render
    return (
        <SidebarMenuButton onClick={() => handleClick()}>
            <CreditCard />
            <span>Billing</span>
        </SidebarMenuButton>
    )
}
