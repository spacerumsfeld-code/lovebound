import Image from 'next/image'
import Link from 'next/link'

export const Logo = (props: {
    height?: number
    width?: number
    noLabel?: boolean
}) => {
    return (
        <Link
            href="/"
            className="font-normal flex space-x-2 items-center text-sm text-black relative z-20"
        >
            <Image
                src="/logo.png"
                alt="logo"
                width={props.width ?? 50}
                height={props.height ?? 50}
            />
            {!props.noLabel && (
                <span className="ml-4 font-medium text-black dark:text-white">
                    Tension.io
                </span>
            )}
        </Link>
    )
}
