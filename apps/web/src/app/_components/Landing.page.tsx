import { CTA } from './cta'
import { Demonstration } from './Demonstration'
import { Features } from './features'
import { Footer } from './footer'
import { Hero } from './test/Hero'
import { Navbar } from './navbar'
import { Pricing } from './pricing'

export const LandingPage = () => {
    // @Render
    return (
        <main>
            <Navbar />
            <Hero />
            <Features />
            <Demonstration />
            <Pricing />
            <CTA />
            <Footer />
        </main>
    )
}
