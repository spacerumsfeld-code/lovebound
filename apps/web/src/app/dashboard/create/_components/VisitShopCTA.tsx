import { SITE_MAP } from 'src/constants'
import Image from 'next/image'
import { Button } from 'src/components/ui/button'

export const VisitShopCTA = () => {
    // *Render
    return (
        <div className="relative rounded-lg overflow-hidden group cursor-pointer hover:bg">
            <Image
                src="https://cdn.sanity.io/images/vjg0x5qe/production/c0edae14dfa508ada4364ef1a260ad0b16b945b3-1024x1024.webp"
                alt="Visit Shop"
                height={200}
                width={400}
                className="w-full h-32 object-cover"
            />
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-2 transition-opacity group-hover:bg-opacity-70">
                <span className="text-white text-sm font-semibold">
                    Want More Options?
                </span>
                <Button href={SITE_MAP.SHOP} variant="primary">
                    Visit Shop
                </Button>
            </div>
        </div>
    )
}
