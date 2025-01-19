import { getCreditCount } from '../../data'
import { CreditDisplay } from './CreditDisplay.view'

export const CreditDisplayAsync = async () => {
    // *Data
    const { creditCount } = await getCreditCount()

    // *Render
    return <CreditDisplay creditCount={creditCount} />
}
