import { Metadata } from 'next'
import { DashboardPage } from './_components/Dashboard.page'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: 'Dashboard',
}

export default DashboardPage
