import { Resend } from 'resend'
import { Resource } from 'sst'

export const resend = new Resend(Resource.ResendApiKey.value)

const sendEmail = async (to: string, subject: string, html: string) => {
    await resend.emails.send({
        from: 'hello@resend.dev',
        to,
        subject,
        html,
    })
}

export const emailClient = {
    sendEmail,
}
