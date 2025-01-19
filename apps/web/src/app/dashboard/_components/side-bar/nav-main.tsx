'use client'

import { House, Pencil, SquareTerminal } from 'lucide-react'

import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '../../../../components/ui/sidebar'
import Link from 'next/link'
import { SITE_MAP } from '../../../../constants'
import { usePathname } from 'next/navigation'

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
    //* State
    const pathname = usePathname()

    // *Interactivity
    const isActive = (url: string) => {
        return pathname === url
    }

    // *Render
    return (
        <SidebarGroup>
            <SidebarMenu>
                {navOptions.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <Link href={item.url}>
                            <SidebarMenuButton
                                tooltip={item.title}
                                isActive={isActive(item.url)}
                            >
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}
