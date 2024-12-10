/**
 * @summary
 * We need to wrap the middleware func to inject secrets.
 * Otherwise, since it runs on edge, it can't access them.
 */

import defaultWrapper from '@opennextjs/aws/overrides/wrappers/aws-lambda.js'
import { Resource } from 'sst'

declare global {
    var resources: () => {
        clerkPk: string
        clerkSk: string
    }
}

globalThis.resources = () => {
    return {
        clerkPk: Resource.ClerkPublishableKey.value,
        clerkSk: Resource.ClerkSecretKey.value,
    }
}

export default defaultWrapper
