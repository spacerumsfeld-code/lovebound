import { Navbar } from './navbar'
import { Hero } from './test/Hero'
import { Features } from './features'
import { Demonstration } from './Demonstration'
import { Pricing } from './pricing'
import { CTA } from './cta'
import { Footer } from './footer'

export const LandingPage = () => {
    // *Render
    return (
        <main className="w-full bg-white bg-dot-black/[0.2]">
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
