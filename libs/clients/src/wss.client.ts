import { ApiGatewayManagementApi } from '@aws-sdk/client-apigatewaymanagementapi'
import { Resource } from 'sst'

const client = new ApiGatewayManagementApi({
    endpoint: Resource.WebsocketApi.managementEndpoint,
})

export const postToConnection = async function ({
    id,
    data,
}: {
    id: string
    data: Record<string, object | string | number | boolean>
}) {
    await client.postToConnection({
        ConnectionId: id,
        Data: JSON.stringify(data),
    })
}
