'use client'

import { House, Pencil, SquareTerminal } from 'lucide-react'

import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '../../../components/ui/sidebar'
import Link from 'next/link'
import { SITE_MAP } from '../../../constants'

const data = {
    navMain: [
        {
            title: 'Dashboard',
            url: SITE_MAP.DASHBOARD,
            icon: House,
            // isActive: true,
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
    ],
}

export const NavMain = () => {
    return (
        <SidebarGroup>
            <SidebarMenu>
                {data.navMain.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <Link href={item.url}>
                            <SidebarMenuButton tooltip={item.title}>
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
