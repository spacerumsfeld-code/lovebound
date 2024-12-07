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
import { CreditDisplay } from './credit-display/CreditDisplay'
import { DashboardThemeToggle } from './DashboardModleToggle'

// @TODO: Get UserButton to be suspended or something, as it causes a lot of layout shift (is not in initial render)

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
