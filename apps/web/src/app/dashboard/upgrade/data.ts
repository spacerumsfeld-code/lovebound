'use server'

import { ProductTypeEnum } from '@client-types/payment/payment.model'
import { client as api } from '@clients/api.client'
import { redirect } from 'next/navigation'
import { getCurrentUser } from 'src/app/data'

export const createCheckoutSession = async ({
    productType,
}: {
    productType: ProductTypeEnum
}) => {
    let url: string
    try {
        const { user } = await getCurrentUser()

        const response = await api.payment.getCheckoutUrl.$get({
            userId: user!.id,
            productType,
        })

        const {
            data: { checkoutUrl },
        } = await response.json()

        url = checkoutUrl
    } catch (error) {
        throw new Error(`client.createCheckoutSession failed: ${error}`)
    }

    return redirect(url!)
}
