import { APIGatewayProxyHandler } from 'aws-lambda'
import { Notification } from '@core'

// @TODO: authentication

export const handler: APIGatewayProxyHandler = async (event) => {
    const userId = event.queryStringParameters?.userId

    console.info('Connecting', event.requestContext.connectionId)
    await Notification.createConnection({
        userId: userId!,
        connectionId: event.requestContext.connectionId!,
    })
    console.info('Connected', event.requestContext.connectionId)

    return { statusCode: 200, body: 'Connected' }
}
