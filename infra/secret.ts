/// <reference path="../.sst/platform/config.d.ts" />

export const secret = {
    DatabaseUrl: new sst.Secret('DatabaseUrl'),
    AuthHandlerSigningSecret: new sst.Secret('AuthHandlerSigningSecret'),
    OpenAIApiKey: new sst.Secret('OpenAIApiKey'),
    UpstashRedisToken: new sst.Secret('UpstashRedisToken'),
}

export const allSecrets = Object.values(secret)
