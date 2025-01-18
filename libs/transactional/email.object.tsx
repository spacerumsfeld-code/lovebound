import { render } from 'jsx-email'
import { EmailType } from './email.model'

import { SampleEmail } from './emails'

export const emails = {
    [EmailType.Sample]: {
        html: async () => await render(<SampleEmail />),
        subject: 'Sample Email',
        text: 'Sample Email',
    }
}
