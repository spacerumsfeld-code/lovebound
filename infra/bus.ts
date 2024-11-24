// /// <reference path="../.sst/platform/config.d.ts" />

// import { secret } from './secret'

// // export const bus = new sst.aws.Bus('Bus')

// // bus.subscribe('eventHandler', {
// //     handler: 'libs/functions/src/event.handler',
// //     timeout: '5 minutes',
// //     link: [secret.OpenAIApiKey],
// // })

// // until event bus is stable.
// export const queue = new sst.aws.Queue('EventQueue', {
//     fifo: true,
// })

// queue.subscribe({
//     handler: 'libs/functions/src/subscriber.handler',
//     timeout: '5 minutes',
//     link: [secret.OpenAIApiKey],
// })
