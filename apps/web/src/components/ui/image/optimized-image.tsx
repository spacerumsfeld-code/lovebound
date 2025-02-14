import Image from 'next/image'

export const OptimizedImage = (props: {
    src: string
    height: number
    width: number
    alt: string
    priority?: boolean
    mobileWidth?: string
    className?: string
}) => {
    // *Render
    return (
        <Image
            src={`${props.src}?auto=format`}
            priority={Boolean(props.priority)}
            alt={props.alt}
            width={props.width}
            height={props.height}
            quality={75}
            placeholder="blur"
            blurDataURL={`${props.src}?w=${Math.max(props.width / 5, 10)}&blur=50&auto=format`}
            className={props.className}
            sizes={`(max-width: 640px) ${props.mobileWidth}, ${props.width}px`}
        />
    )
}
