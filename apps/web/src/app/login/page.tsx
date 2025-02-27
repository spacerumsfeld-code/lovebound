import { Metadata } from 'next'
import { LoginPage } from './components/Login.page'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: 'Login',
}

export default LoginPage
