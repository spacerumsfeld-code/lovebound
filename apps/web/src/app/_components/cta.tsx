import { ArrowRight } from 'lucide-react'

export const CTA = () => {
    return (
        <section className="my-20 md:my-40 justify-start relative z-20 max-w-7xl mx-auto bg-gradient-to-br from-slate-800 dark:from-neutral-900 to-gray-900 sm:rounded-2xl">
            <div
                className="absolute inset-0 w-full h-full opacity-10 bg-noise [mask-image:radial-gradient(#fff,transparent,75%)]"
                style={{
                    backgroundImage: 'url(/noise.webp)',
                    backgroundSize: '30%',
                }}
            ></div>
            <div className="relative flex flex-col gap-8 sm:rounded-2xl overflow-hidden px-6 md:px-8 ">
                <div
                    className="pointer-events-none absolute inset-y-0 right-0 select-none overflow-hidden rounded-2xl"
                    style={{
                        mask: 'radial-gradient(33.875rem 33.875rem at calc(100% - 8.9375rem) 0, white 3%, transparent 70%)',
                    }}
                ></div>
                <div className="relative content-center px-0 py-10 sm:px-10 sm:pt-20 sm:pb-10 lg:px-10">
                    <h2 className="text-left text-balance  text-2xl md:text-3xl lg:text-5xl font-semibold tracking-[-0.015em] text-white">
                        Ready to claim your free story?
                    </h2>
                    <p className="mt-8 max-w-[26rem] text-left text-base/6 text-neutral-200">
                        Sign up with no obligation and start creating!
                    </p>

                    <button className="mt-8 flex space-x-2 items-center group text-base px-4 py-2 rounded-lg bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]">
                        <span>Get Started</span>
                        <ArrowRight className="text-white group-hover:translate-x-1 stroke-[1px] h-3 w-3 mt-0.5 transition-transform duration-200" />
                    </button>
                </div>
            </div>
        </section>
    )
}
