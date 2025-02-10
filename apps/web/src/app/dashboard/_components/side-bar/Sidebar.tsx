import { NavMain } from './nav-main'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from '../../../../components/ui/sidebar'
import { UserButton } from '@clerk/nextjs'
import { SidebarLogo } from './SidebarLogo'
import { CreateStoryButton } from './CreateStoryButton'
import { CreditDisplayAsync } from '../credit-display/CreditDisplay.async'

export const AppSidebar = ({
    ...props
}: React.ComponentProps<typeof Sidebar>) => {
    return (
        <Sidebar id="sidebar" collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarLogo />
            </SidebarHeader>
            <SidebarContent className="p-2 justify-between">
                <NavMain />
                <div className="flex flex-col gap-4">
                    <CreateStoryButton />
                    <CreditDisplayAsync />
                </div>
            </SidebarContent>
            <SidebarFooter>
                <UserButton
                    userProfileProps={{
                        appearance: {
                            elements: {
                                profileSection__emailAddresses: {
                                    display: 'none',
                                },
                                profileSection__danger: {
                                    display: 'none',
                                },
                                profileSection__connectedAccounts: {
                                    display: 'none',
                                },
                            },
                        },
                    }}
                />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
