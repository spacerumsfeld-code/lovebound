/**
 * @summary
 * Securely load environment variables from SST secrets into the next.js environment.
 */

import { Resource } from 'sst'

process.env.WEB_URL = Resource.WebUrl.value
process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID = Resource.CrispWebsiteId.value
process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY =
    Resource.ClerkPublishableKey.value
process.env.CLERK_SECRET_KEY = Resource.ClerkSecretKey.value
process.env.NEXT_PUBLIC_WEBSOCKET_URL = Resource.WebsocketApi.url
