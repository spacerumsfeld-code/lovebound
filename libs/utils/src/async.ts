export const handleAsync = async <T>(
    fn: Promise<T>,
): Promise<[T | null, null | Error]> => {
    try {
        const result = await fn
        return [result, null]
    } catch (error) {
        return [null, error as Error]
    }
}

type Fulfilled<T> = { status: 'fulfilled'; value: T }
type Rejected = { status: 'rejected'; reason: string }
type Settled<T> = Fulfilled<T> | Rejected

export function extractFulfilledValues<T extends readonly any[]>(results: {
    [K in keyof T]: Settled<T[K]>
}): {
    values: { [K in keyof T]: T[K] | undefined }
    hasRejections: boolean
} {
    const values = results.map((result) =>
        result.status === 'fulfilled' ? result.value : undefined,
    ) as { [K in keyof T]: T[K] | undefined }

    const hasRejections = results.some((result) => result.status === 'rejected')

    return {
        values,
        hasRejections,
    }
}
