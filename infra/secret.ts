/// <reference path="../.sst/platform/config.d.ts" />

export const secret = {
    DatabaseUrl: new sst.Secret('DatabaseUrl'),
    AuthHandlerSigningSecret: new sst.Secret('AuthHandlerSigningSecret'),
    OpenAIApiKey: new sst.Secret('OpenAIApiKey'),
    UpstashRedisToken: new sst.Secret('UpstashRedisToken'),
    InngestBranchId: new sst.Secret('InngestBranchId'),
    InngestSigningKey: new sst.Secret('InngestSigningKey'),
    InngestEventKey: new sst.Secret('InngestEventKey'),
    StripePublishableKey: new sst.Secret('StripePublishableKey'),
    StripeSecretKey: new sst.Secret('StripeSecretKey'),
    StripeWebhookSecret: new sst.Secret('StripeWebhookSecret'),
}

export const allSecrets = Object.values(secret)
