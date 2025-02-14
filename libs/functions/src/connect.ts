import { APIGatewayProxyHandler } from 'aws-lambda'
import { Notification } from '@core'

export const handler: APIGatewayProxyHandler = async (event) => {
    const userId = event.queryStringParameters?.userId

    await Notification.createConnection({
        userId: userId!,
        connectionId: event.requestContext.connectionId!,
    })

    return { statusCode: 200, body: 'Connected' }
}
