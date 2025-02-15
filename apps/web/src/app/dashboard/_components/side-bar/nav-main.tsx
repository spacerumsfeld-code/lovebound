import { CreditCard, House, Pencil, SquareTerminal } from 'lucide-react'

import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from 'src/components/ui/sidebar'

import Link from 'next/link'
import { SITE_MAP } from 'src/constants'
import { Suspense } from 'react'
import { BillingLink } from './billing-link/BillingLink'

const navOptions = [
    {
        title: 'Dashboard',
        url: SITE_MAP.DASHBOARD,
        icon: House,
    },
    {
        title: 'Stories',
        url: SITE_MAP.STORIES,
        icon: Pencil,
    },
    {
        title: 'Shop',
        url: SITE_MAP.SHOP,
        icon: SquareTerminal,
    },
]

export const NavMain = () => {
    // *Render
    return (
        <SidebarGroup>
            <SidebarMenu>
                {navOptions.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <Link href={item.url}>
                            <SidebarMenuButton>
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                ))}
                <Suspense
                    fallback={
                        <SidebarMenuButton>
                            <CreditCard />
                            <span>Billing</span>
                        </SidebarMenuButton>
                    }
                >
                    <BillingLink />
                </Suspense>
            </SidebarMenu>
        </SidebarGroup>
    )
}
