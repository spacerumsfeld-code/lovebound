import { Redis } from '@upstash/redis'
import { Resource } from 'sst'

export const cacheClient = new Redis({
    url: 'https://vocal-teal-46538.upstash.io',
    token: Resource.UpstashRedisToken.value,
})
