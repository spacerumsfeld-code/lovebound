'use client'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@web/src/components/ui/breadcrumb'

import { useSelectedLayoutSegments } from 'next/navigation'
import React from 'react'

export const Breadcrumbs = () => {
    const segments = useSelectedLayoutSegments()

    return (
        <div className="flex items-center gap-2 px-4">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href="/dashboard">
                            Dashboard
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    {segments.length > 0 && (
                        <BreadcrumbSeparator className="hidden md:block" />
                    )}
                    {segments.map((segment, _index) => (
                        <React.Fragment key={segment}>
                            <BreadcrumbItem>
                                <BreadcrumbLink href={`/dashboard/${segment}`}>
                                    {segment.slice(0, 1).toUpperCase() +
                                        segment.slice(1)}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            {/* {index < segments.length - 1 && (
                                <BreadcrumbSeparator
                                    key={`${segment}-separator`}
                                />
                            )} */}
                        </React.Fragment>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    )
}
