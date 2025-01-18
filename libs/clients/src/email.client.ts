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

const addToAudience = async (
    email: string,
    firstName?: string,
    lastName?: string,
) => {
    await resend.contacts.create({
        email,
        firstName,
        lastName,
        unsubscribed: false,
        audienceId: Resource.ResendAudienceId.value,
    })
}

export const emailClient = {
    sendEmail,
    addToAudience,
}
