import { APIGatewayProxyHandler } from 'aws-lambda'
import { Connection } from '@core'

// @TODO: switch to redis for connection management. for now we want development velocity

export const handler: APIGatewayProxyHandler = async (event) => {
    console.info('Disconnecting', event.requestContext.connectionId)
    await Connection.deleteConnection({
        connectionId: event.requestContext.connectionId!,
    })
    console.info('Disconnected', event.requestContext.connectionId)

    return { statusCode: 200, body: 'Disconnected' }
}
