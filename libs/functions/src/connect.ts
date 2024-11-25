import { APIGatewayProxyHandler } from 'aws-lambda'

export const handler: APIGatewayProxyHandler = async (event) => {
    const userId = event.queryStringParameters?.userId
    console.info(userId, event.requestContext.connectionId)

    // update userId: connectionId mapping in connection table

    return { statusCode: 200, body: 'Connected' }
}
