import { Separator } from '../../components/ui/separator'
import { AppSidebar } from './_components/side-bar/Sidebar'
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '../../components/ui/sidebar'
import { Button } from '../../components/ui/button'
import { ActionsFromParams } from '../../components/ui/actions-from-params'
import { Suspense } from 'react'
import { Toaster } from '../../components/ui/sonner'
import { WebsocketWrapper } from './_components/websocket/WebsocketWrapper'
import { Breadcrumbs } from './_components/side-bar/crumbs'
import { Modal } from './_components/modals/Modal'
import Script from 'next/script'
import { EnvironmentEnum } from 'src/constants'
import Link from 'next/link'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {process.env.ENVIRONMENT === EnvironmentEnum.PRODUCTION && (
                <Script strategy="lazyOnload" id="crisp-chat">
                    {`
                window.$crisp=[];
                window.CRISP_WEBSITE_ID="${process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID!}";
                (function() {
                    d = document;
                    s = d.createElement("script");
                    s.src = "https://client.crisp.chat/l.js";
                    s.async = 1;
                    d.getElementsByTagName("head")[0].appendChild(s);
                })();
            `}
                </Script>
            )}
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
                        <Button
                            as={Link}
                            variant="primary"
                            href="/dashboard/create"
                        >
                            Create Story
                        </Button>
                    </header>
                    <Separator orientation="horizontal" className="w-full" />
                    {children}
                </SidebarInset>
            </SidebarProvider>
            <Suspense>
                <ActionsFromParams />
            </Suspense>
            <WebsocketWrapper />
            <Toaster position="bottom-center" />
            <Modal />
        </>
    )
}
