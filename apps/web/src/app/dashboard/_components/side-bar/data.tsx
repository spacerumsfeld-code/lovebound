import { client as api } from '@clients/api.client'

export const checkIfUserExistsInStripe = async () => {
    try {
        const response = await api.user.checkIfUserExistsInStripe.$post()
        const data = await response.json()
        const { userExistsInStripe } = data.data

        return { userExistsInStripe }
    } catch (error) {
        throw new Error(
            `❌ client.checkIfUserExistsInStripe error: ${error.message}`,
        )
    }
}
