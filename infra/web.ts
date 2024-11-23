/// <reference path="../.sst/platform/config.d.ts" />

import { server } from './server'
import { type NextjsArgs } from '../.sst/platform/src/components/aws'

const webConfig: NextjsArgs = {
    link: [server],
    path: 'apps/web',
    dev: {
        autostart: true,
        command: 'pnpm run dev',
    },
}

// if (process.env.PULUMI_NODEJS_STACK === "production") {
//   webConfig.domain = {
//     name: "topcak.es",
//     redirects: ["www.topcak.es"],
//   };
// }

const web = new sst.aws.Nextjs('Web', webConfig)

export const outputs = {
    webUrl: web.url,
}
