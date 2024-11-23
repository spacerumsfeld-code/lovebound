'use server'

import { client as api } from '@clients/api.client'

export const getUserById = async (id: number) => {
    const response = await api.user.getUserById.$get({ id })
    const {
        data: { id: returnId },
    } = await response.json()
    return { id: returnId }
}
