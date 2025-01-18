/**
 * @Summary
 * We will use this as a base for all transactional emails
 * until more complexity is absolutely necessary.
 */

import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Link,
    Text,
} from 'jsx-email'
import { Resource } from 'sst'

const main = {
    backgroundColor: '#ffffff',
    fontFamily: 'HelveticaNeue,Helvetica,Arial,sans-serif',
}

const container = {
    backgroundColor: '#ffffff',
    border: '1px solid #eee',
    borderRadius: '5px',
    boxShadow: '0 5px 10px rgba(20,50,70,.2)',
    marginTop: '20px',
    width: '360px',
    margin: '0 auto',
    padding: '68px 0 130px',
}

const logo = {
    margin: '0 auto',
}

const secondary = {
    color: '#000',
    display: 'inline-block',
    fontFamily: 'HelveticaNeue-Medium,Helvetica,Arial,sans-serif',
    fontSize: '20px',
    fontWeight: 500,
    lineHeight: '24px',
    marginTop: '0',
    marginBottom: '20px',
    textAlign: 'center' as const,
}

const paragraph = {
    color: '#444',
    fontSize: '15px',
    fontFamily: 'HelveticaNeue,Helvetica,Arial,sans-serif',
    letterSpacing: '0',
    lineHeight: '23px',
    padding: '0 40px',
    margin: '0',
    marginBottom: '20px',
    textAlign: 'center' as const,
}

const link = {
    color: '#444',
    textDecoration: 'underline',
}

const footer = {
    color: '#000',
    fontSize: '12px',
    fontWeight: 800,
    letterSpacing: '0',
    lineHeight: '23px',
    margin: '0',
    marginTop: '20px',
    fontFamily: 'HelveticaNeue,Helvetica,Arial,sans-serif',
    textAlign: 'center' as const,
    textTransform: 'uppercase' as const,
}

const section = {
    padding: '5% 0',
}

export const Template = (props: {
    config: { title: string; message: string }
}) => (
    <Html>
        <Head />
        <Body style={main}>
            <Container style={container}>
                <div style={section}>
                    <Img
                        src={Resource.LogoUrl.value}
                        width="200"
                        height="200"
                        alt="Lovebound"
                        style={logo}
                    />
                </div>

                <div style={section}>
                    <Heading style={secondary}>
                        {props?.config?.title ??
                            'Placeholder for email preview server'}
                    </Heading>
                </div>

                <div>
                    <Text style={paragraph}>
                        {props?.config?.message ??
                            'Placeholder for email preview server'}
                    </Text>
                    <Text style={paragraph}>
                        <Link href={Resource.WebUrl.value} style={link}>
                            Go to App
                        </Link>
                    </Text>
                </div>
            </Container>
            <Text style={footer}>Made with ❤️ by Lovebound</Text>
        </Body>
    </Html>
)
