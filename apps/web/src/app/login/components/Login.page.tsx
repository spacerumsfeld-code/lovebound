import { LoginLeft } from './Left'
import { LoginRight } from './Right'

export const LoginPage = () => {
    return (
        <main className="grid grid-cols-1 md:grid-cols-2 min-h-screen w-full">
            <LoginLeft />
            <LoginRight />
        </main>
    )
}
