import { auth, currentUser } from '@clerk/nextjs/server'

export default async function Dashboard() {
    const [authData, userData] = await Promise.all([auth(), currentUser()])
    console.info('authData', authData, 'userData', userData)

    return <div>Dashboard</div>
}
