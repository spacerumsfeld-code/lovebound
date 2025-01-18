/// <reference path="../.sst/platform/config.d.ts" />

export const secret = {
    // Client Secrets
    WebUrl: new sst.Secret('WebUrl'),
    Environment: new sst.Secret('Environment'),
    SentryDsn: new sst.Secret('SentryDsn'),
    CrispWebsiteId: new sst.Secret('CrispWebsiteId'),
    ClerkPublishableKey: new sst.Secret('ClerkPublishableKey'),
    ClerkSecretKey: new sst.Secret('ClerkSecretKey'),
    ClerkEncryptionKey: new sst.Secret('ClerkEncryptionKey'),
    PosthogKey: new sst.Secret('PosthogKey'),
    // Server Secrets
    DatabaseUrl: new sst.Secret('DatabaseUrl'),
    AuthHandlerSigningSecret: new sst.Secret('AuthHandlerSigningSecret'),
    OpenAIApiKey: new sst.Secret('OpenAIApiKey'),
    UpstashRedisUrl: new sst.Secret('UpstashRedisUrl'),
    UpstashRedisToken: new sst.Secret('UpstashRedisToken'),
    InngestSigningKey: new sst.Secret('InngestSigningKey'),
    InngestEventKey: new sst.Secret('InngestEventKey'),
    StripePublishableKey: new sst.Secret('StripePublishableKey'),
    StripeSecretKey: new sst.Secret('StripeSecretKey'),
    StripeWebhookSecret: new sst.Secret('StripeWebhookSecret'),
    // Feature Flags
    FeatureSubscriptions: new sst.Secret('FeatureSubscriptions'),
}

export const allSecrets = Object.values(secret)
