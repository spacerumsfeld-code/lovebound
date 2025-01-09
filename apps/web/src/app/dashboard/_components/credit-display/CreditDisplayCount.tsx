import { getCreditCount } from '../../data'

export const CreditDisplayCount = async () => {
    const { creditCount } = await getCreditCount()

    // @Render
    return <span className="text-xl font-semibold">{creditCount}</span>
}
