import { SidebarMenuButton, SidebarMenuItem } from 'src/components/ui/sidebar'
import { checkIfUserExistsInStripe } from '../data'
import { CreditCard } from 'lucide-react'
import Link from 'next/link'
import { NotInStripeLink } from './NotInStripeLink'

export const BillingLink = async () => {
    // *Data
    const { userExistsInStripe } = await checkIfUserExistsInStripe()

    // *Render
    return (
        <>
            {userExistsInStripe ? (
                <SidebarMenuItem key={'Billing'}>
                    <Link href={process.env.STRIPE_BILLING_DASHBOARD_URL!}>
                        <SidebarMenuButton>
                            <CreditCard />
                            <span>Billing</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
            ) : (
                <NotInStripeLink />
            )}
        </>
    )
}
