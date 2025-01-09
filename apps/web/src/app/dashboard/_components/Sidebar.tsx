import { NavMain } from '../../../app/dashboard/_components/nav-main'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from '../../../components/ui/sidebar'
import { UserButton } from '@clerk/nextjs'
import { Logo } from '../../_components/logo'
import { Button } from '../../..//components/ui/button'
import { CreditDisplay } from './credit-display/CreditDisplay'
import { DashboardThemeToggle } from './DashboardModleToggle'
import Link from 'next/link'

export const AppSidebar = ({
    ...props
}: React.ComponentProps<typeof Sidebar>) => {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <Logo />
            </SidebarHeader>
            <SidebarContent className="p-2 justify-between">
                <NavMain />
                <div className="flex flex-col gap-8">
                    <Button as={Link} href="/dashboard/create">
                        + Create Story
                    </Button>
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
