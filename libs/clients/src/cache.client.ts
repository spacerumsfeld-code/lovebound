import { Redis } from '@upstash/redis'
import { Resource } from 'sst'

export const cacheClient = new Redis({
    url: Resource.UpstashRedisUrl.value,
    token: Resource.UpstashRedisToken.value,
})
