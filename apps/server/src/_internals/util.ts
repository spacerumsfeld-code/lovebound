import superjson from 'superjson'
import { HTTPException } from 'hono/http-exception'

export const parseSuperJSON = (value: string) => {
    try {
        return superjson.parse(value)
    } catch {
        return value
    }
}

export const handleError = (error: Error) => {
    console.error(error)
    throw new HTTPException(400, {
        message: error.message,
    })
}
