'use client'

import {
    House,
    Pencil,
    Settings2,
    SquareTerminal,
    type LucideIcon,
} from 'lucide-react'

import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@web/src/components/ui/sidebar'
import Link from 'next/link'

const data = {
    navMain: [
        {
            title: 'Dashboard',
            url: '/dashboard',
            icon: House,
            isActive: true,
        },
        {
            title: 'Stories',
            url: '/dashboard/stories',
            icon: Pencil,
            isActive: true,
        },
        {
            title: 'Addons',
            url: '/dashboard/addons',
            icon: SquareTerminal,
            isActive: true,
        },
        {
            title: 'Settings',
            url: '/dashboard/settings',
            icon: Settings2,
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
