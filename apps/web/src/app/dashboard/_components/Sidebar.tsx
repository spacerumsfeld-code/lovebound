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
import { Button } from '@web/src/components/ui/button'
import { CreditDisplay } from './CreditDisplay'
import { DashboardThemeToggle } from './DashboardModleToggle'

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
            <SidebarContent className="p-2 justify-between">
                <NavMain items={data.navMain} />
                <div className="flex flex-col gap-8">
                    <Button href="/dashboard/create">+ Create Story</Button>
                    <CreditDisplay />
                    <DashboardThemeToggle />
                </div>
            </SidebarContent>
            <SidebarFooter>
                <UserButton />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
