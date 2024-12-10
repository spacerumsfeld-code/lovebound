import { OpenNextConfig } from '@opennextjs/aws/types/open-next.js'

const config: OpenNextConfig = {
    default: {
        override: {
            wrapper: 'aws-lambda-streaming',
        },
    },
}

export default config
