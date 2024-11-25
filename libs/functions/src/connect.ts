import { APIGatewayProxyHandler } from 'aws-lambda'
import { Connection } from '@core'

export const handler: APIGatewayProxyHandler = async (event) => {
    const userId = event.queryStringParameters?.userId

    console.info('Connecting', event.requestContext.connectionId)
    await Connection.createConnection({
        userId: userId!,
        connectionId: event.requestContext.connectionId!,
    })
    console.info('Connected', event.requestContext.connectionId)

    return { statusCode: 200, body: 'Connected' }
}
