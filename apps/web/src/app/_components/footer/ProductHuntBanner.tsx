import Link from 'next/link'
import Image from 'next/image'

export const ProductHuntBanner = () => {
    // *Render
    return (
        <Link
            href="https://www.producthunt.com/posts/lovebound?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-lovebound"
            target="_blank"
        >
            <Image
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=833692&theme=neutral&t=1738271920081"
                alt="Product Hunt Banner"
                width="250"
                height="50"
                className="mt-8"
            />
        </Link>
    )
}
