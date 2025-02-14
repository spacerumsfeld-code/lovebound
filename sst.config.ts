import type {} from './.sst/platform/config'

import { readdirSync } from 'fs'

export default $config({
    app(input) {
        return {
            name: 'lovebound-io',
            removal: input?.stage === 'production' ? 'retain' : 'remove',
            home: 'aws',
        }
    },
    async run() {
        const outputs = {}

        for (const value of readdirSync('./infra/')) {
            const result = await import('./infra/' + value)
            if (result.outputs) Object.assign(outputs, result.outputs)
        }

        return outputs
    },
})
