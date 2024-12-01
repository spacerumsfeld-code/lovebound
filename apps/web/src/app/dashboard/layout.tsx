import { Separator } from '@web/src/components/ui/separator'
import { AppSidebar } from './_components/Sidebar'
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '@web/src/components/ui/sidebar'
import { Button } from '@web/src/components/ui/button'
import { ActionsFromParams } from '@web/src/components/ui/actions-from-params'
import { Suspense } from 'react'
import { Toaster } from '@web/src/components/ui/sonner'
import { WebsocketWrapper } from './_components/websocket/WebsocketWrapper'
import { Breadcrumbs } from './_components/crumbs'
import { Modal } from './_components/modals/Modal'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <header className="pr-8 justify-between flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                        <div className="flex items-center gap-2 px-4">
                            <SidebarTrigger />
                            <Separator
                                orientation="vertical"
                                className="mr-2 h-4"
                            />
                            <Breadcrumbs />
                        </div>
                        <Button>+ Create Story</Button>
                    </header>
                    <Separator orientation="horizontal" className="w-full" />
                    {children}
                </SidebarInset>
            </SidebarProvider>
            <Suspense>
                <ActionsFromParams />
            </Suspense>
            <WebsocketWrapper />
            <Toaster />
            <Modal />
        </>
    )
}
