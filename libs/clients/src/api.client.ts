import { ApiSpec } from '@server'
import { hc } from 'hono/client'
import { HTTPException } from 'hono/http-exception'
import { StatusCode } from 'hono/utils/http-status'
import superjson from 'superjson'
import { Resource } from 'sst'

export const baseClient = hc<ApiSpec>(Resource.Server.url, {
    fetch: async (input: RequestInfo | URL, init?: RequestInit) => {
        const response = await fetch(input, { ...init, cache: 'no-store' })

        if (!response.ok) {
            throw new HTTPException(response.status as StatusCode, {
                message: response.statusText,
                res: response,
            })
        }

        const contentType = response.headers.get('Content-Type')

        response.json = async () => {
            const text = await response.text()

            if (contentType === 'application/superjson') {
                return superjson.parse(text)
            }

            try {
                return JSON.parse(text)
            } catch (error) {
                throw new Error('Invalid JSON response')
            }
        }

        return response
    },
})['api']

function getHandler(obj: object, ...keys: string[]) {
    let current = obj
    for (const key of keys) {
        current = current[key as keyof typeof current]
    }
    return current as Function
}

function serializeWithSuperJSON(data: any): any {
    if (typeof data !== 'object' || data === null) {
        return data
    }
    return Object.fromEntries(
        Object.entries(data).map(([key, value]) => [
            key,
            superjson.stringify(value),
        ]),
    )
}

/**
 * This is an optional convenience proxy to pass data directly to your API
 * instead of using nested objects as hono does by default
 */
function createProxy(target: any, path: string[] = []): any {
    const proxy = new Proxy(target, {
        get(target, prop, receiver) {
            if (typeof prop === 'string') {
                const newPath = [...path, prop]

                if (prop === '$get') {
                    return async (...args: any[]) => {
                        const executor = getHandler(baseClient, ...newPath)
                        const serializedQuery = serializeWithSuperJSON(args[0])
                        return executor({ query: serializedQuery })
                    }
                }

                if (prop === '$post') {
                    return async (...args: any[]) => {
                        const executor = getHandler(baseClient, ...newPath)
                        const serializedJson = serializeWithSuperJSON(args[0])
                        return executor({ json: serializedJson })
                    }
                }

                return createProxy(target[prop], newPath)
            }
            return Reflect.get(target, prop, receiver)
        },
    })
    return proxy
}

export const client: typeof baseClient = createProxy(baseClient)
