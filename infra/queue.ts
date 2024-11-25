/// <reference path="../.sst/platform/config.d.ts" />

import { bucket } from './bucket'
import { allSecrets } from './secret'
import { websocket } from './websocket'

export const dlq = new sst.aws.Queue('EventQueueDLQ')
export const queue = new sst.aws.Queue('EventQueue', {
    dlq: {
        retry: 1,
        queue: dlq.arn,
    },
})

queue.subscribe({
    handler: 'libs/functions/src/subscriber.handler',
    link: [...allSecrets, bucket, queue, websocket],
    timeout: '1 minute',
})
