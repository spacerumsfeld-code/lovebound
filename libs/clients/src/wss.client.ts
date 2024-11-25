import { ApiGatewayManagementApi } from '@aws-sdk/client-apigatewaymanagementapi'

const client = new ApiGatewayManagementApi({
    endpoint: 'https://6555250mv7..execute-api.us-east-1.amazonaws.com/dev',
})

export const postToConnection = async function ({
    id,
    data,
}: {
    id: string
    data: Record<string, any>
}) {
    await client.postToConnection({
        ConnectionId: id,
        Data: JSON.stringify(data),
    })
}
