// import { ApiGatewayManagementApi } from 'aws-sdk'

// pickup: identify endpoint, use this client to post to connection when story created, when cover and/or voiceover generated

// adjust sst definitiom for this handler so we can bind websocket (and db and so on) to it.

// api.route( "$connect", { handler: "lambda/handler.connect", link: [api] } );

const postToConnection = async function ({
    id,
    data,
}: {
    id: string
    data: any
}) {
    const apiG = new ApiGatewayManagementApi({
        endpoint:
            'https://xxxxxxxxxxxxxxxxxxxx.execute-api.us-east-1.amazonaws.com/dev',
    })
    await apiG.postToConnection({ ConnectionId: id, Data: data }).promise()
}
