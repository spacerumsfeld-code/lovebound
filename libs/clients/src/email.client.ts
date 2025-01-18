import { Resend } from 'resend'
import { Resource } from 'sst'
import { EmailType, emails } from '@transactional'

export const resend = new Resend(Resource.ResendApiKey.value)

const sendEmail = async ({ to, emailType }: { to: string; emailType: EmailType }) => {
    await resend.emails.send({
        from: 'Lovebound <admin@lovebound.io>',
        to,
        text: emails[emailType as keyof typeof emails].text,
        subject: emails[emailType as keyof typeof emails].subject,
        html: await emails[emailType as keyof typeof emails].html(),
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
