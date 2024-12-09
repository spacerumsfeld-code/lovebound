/// <reference path="../.sst/platform/config.d.ts" />

export const secret = {
    // Web secrets
    WebUrl: new sst.Secret('WebUrl'),
    CrispWebsiteId: new sst.Secret('CrispWebsiteId'),
    ClerkPublishableKey: new sst.Secret('ClerkPublishableKey'),
    ClerkSecretKey: new sst.Secret('ClerkSecretKey'),

    // Everything else secrets
    DatabaseUrl: new sst.Secret('DatabaseUrl'),
    AuthHandlerSigningSecret: new sst.Secret('AuthHandlerSigningSecret'),
    OpenAIApiKey: new sst.Secret('OpenAIApiKey'),
    UpstashRedisUrl: new sst.Secret('UpstashRedisUrl'),
    UpstashRedisToken: new sst.Secret('UpstashRedisToken'),
    //
    InngestSigningKey: new sst.Secret('InngestSigningKey'),
    InngestEventKey: new sst.Secret('InngestEventKey'),
    StripePublishableKey: new sst.Secret('StripePublishableKey'),
    StripeSecretKey: new sst.Secret('StripeSecretKey'),
    StripeWebhookSecret: new sst.Secret('StripeWebhookSecret'),
}

export const allSecrets = Object.values(secret)
