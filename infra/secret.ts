import type {} from '../.sst/platform/config'

export const secret = {
    // Client Secrets
    WebUrl: new sst.Secret('WebUrl'),
    LogoUrl: new sst.Secret('LogoUrl'),
    Environment: new sst.Secret('Environment'),
    SentryDsn: new sst.Secret('SentryDsn'),
    CrispWebsiteId: new sst.Secret('CrispWebsiteId'),
    ClerkPublishableKey: new sst.Secret('ClerkPublishableKey'),
    ClerkSecretKey: new sst.Secret('ClerkSecretKey'),
    ClerkEncryptionKey: new sst.Secret('ClerkEncryptionKey'),
    PosthogKey: new sst.Secret('PosthogKey'),
    StripeBillingDashboardUrl: new sst.Secret('StripeBillingDashboardUrl'),
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
    StripeReferralCouponId: new sst.Secret('StripeReferralCouponId'),
    ResendApiKey: new sst.Secret('ResendApiKey'),
    ResendAudienceId: new sst.Secret('ResendAudienceId'),
    // Feature Flags
}

export const allSecrets = Object.values(secret)
