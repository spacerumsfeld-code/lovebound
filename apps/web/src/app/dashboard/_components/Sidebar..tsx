'use client'

import * as React from 'react'
import { House, Pencil, Settings2, SquareTerminal } from 'lucide-react'

import { NavMain } from '@web/src/app/dashboard/_components/nav-main'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from '@web/src/components/ui/sidebar'
import { UserButton } from '@clerk/nextjs'
import { Logo } from '../../_components/logo'

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

export const AppSidebar = ({
    ...props
}: React.ComponentProps<typeof Sidebar>) => {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <Logo />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <UserButton />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
