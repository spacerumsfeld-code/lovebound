import { cn } from 'src/lib/utils'
import { FeaturedTestimonials } from './Testimonials'

export const LoginRight = () => {
    // @Render
    return (
        <div className="w-full relative w-full z-20 hidden md:flex border-l border-neutral-100 dark:border-neutral-800 overflow-hidden bg-white dark:bg-neutral-900 items-center justify-center">
            <div className="max-w-sm mx-auto">
                <FeaturedTestimonials />
                <p
                    className={cn(
                        'font-semibold text-xl text-center text-neutral-600 dark:text-neutral-400',
                    )}
                >
                    People love us
                </p>
                <p
                    className={cn(
                        'font-normal text-base text-center text-neutral-500 dark:text-neutral-400 mt-8',
                    )}
                >
                    DevStudio is loved by thousands of people across the world,
                    be part of the community and join us.
                </p>
            </div>

            <GridLineHorizontal
                className="top-0  left-1/2 -translate-x-1/2"
                offset="-10px"
            />
            <GridLineHorizontal
                className="bottom-0 top-auto  left-1/2 -translate-x-1/2"
                offset="-10px"
            />
            <GridLineVertical
                className="left-10  top-1/2 -translate-y-1/2"
                offset="-10px"
            />
            <GridLineVertical
                className="right-10 left-auto top-1/2 -translate-y-1/2"
                offset="-10px"
            />
        </div>
    )
}

const GridLineHorizontal = ({
    className,
    offset,
}: {
    className?: string
    offset?: string
}) => {
    return (
        <div
            style={
                {
                    '--background': '#ffffff',
                    '--color': 'rgba(0, 0, 0, 0.2)',
                    '--height': '1px',
                    '--width': '5px',
                    '--fade-stop': '90%',
                    '--offset': offset || '200px', //-100px if you want to keep the line inside
                    '--color-dark': 'rgba(255, 255, 255, 0.2)',
                    maskComposite: 'exclude',
                } as React.CSSProperties
            }
            className={cn(
                'absolute w-[calc(100%+var(--offset))] h-[var(--height)] left-[calc(var(--offset)/2*-1)]',
                'bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]',
                '[background-size:var(--width)_var(--height)]',
                '[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]',
                '[mask-composite:exclude]',
                'z-30',
                'dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]',
                className,
            )}
        ></div>
    )
}

const GridLineVertical = ({
    className,
    offset,
}: {
    className?: string
    offset?: string
}) => {
    return (
        <div
            style={
                {
                    '--background': '#ffffff',
                    '--color': 'rgba(0, 0, 0, 0.2)',
                    '--height': '5px',
                    '--width': '1px',
                    '--fade-stop': '90%',
                    '--offset': offset || '150px', //-100px if you want to keep the line inside
                    '--color-dark': 'rgba(255, 255, 255, 0.2)',
                    maskComposite: 'exclude',
                } as React.CSSProperties
            }
            className={cn(
                'absolute h-[calc(100%+var(--offset))] w-[var(--width)] top-[calc(var(--offset)/2*-1)]',
                'bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)]',
                '[background-size:var(--width)_var(--height)]',
                '[mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]',
                '[mask-composite:exclude]',
                'z-30',
                'dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]',
                className,
            )}
        ></div>
    )
}
