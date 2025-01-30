import { SidebarMenuButton, SidebarMenuItem } from 'src/components/ui/sidebar'
import { checkIfUserExistsInStripe } from './data'
import { CreditCard } from 'lucide-react'
import Link from 'next/link'
import { SITE_MAP } from 'src/constants'

export const BillingLink = async () => {
    // *Data
    const { userExistsInStripe } = await checkIfUserExistsInStripe()

    //*Render
    const linkHref = userExistsInStripe
        ? process.env.STRIPE_BILLING_DASHBOARD_URL!
        : SITE_MAP.DASHBOARD
    const toolTipContent = userExistsInStripe
        ? 'Manage your billing settings'
        : 'Once you have made a purchase, you can manage your billing settings here.'

    return (
        <SidebarMenuItem key={'Billing'}>
            <Link href={linkHref}>
                <SidebarMenuButton tooltip={toolTipContent}>
                    <CreditCard />
                    <span>Billing</span>
                </SidebarMenuButton>
            </Link>
        </SidebarMenuItem>
    )
}
