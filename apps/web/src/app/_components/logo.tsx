import Link from 'next/link'
import { OptimizedImage } from 'src/components/ui/image/optimized-image'

export const Logo = (props: {
    width?: number
    height?: number
    label?: boolean
}) => {
    return (
        <Link
            href="/"
            className="font-normal flex space-x-2 items-center text-sm text-black relative z-20"
        >
            <OptimizedImage
                src="https://cdn.sanity.io/images/vjg0x5qe/production/a19cb861ed907815db93e1416ae8a449f6715812-500x500.png"
                alt="logo"
                width={props.width ?? 60}
                height={props.height ?? 60}
                className="bg:white hover:scale-105 transition-transform duration-200 ease-in-out relative z-20"
            />
            {props.label && (
                <span className="ml-4 font-medium text-black dark:text-white">
                    Lovebound
                </span>
            )}
        </Link>
    )
}
