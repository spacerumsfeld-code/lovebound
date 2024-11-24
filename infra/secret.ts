/// <reference path="../.sst/platform/config.d.ts" />

export const secret = {
    DatabaseUrl: new sst.Secret('DatabaseUrl'),
    AuthHandlerSigningSecret: new sst.Secret('AuthHandlerSigningSecret'),
    OpenAIApiKey: new sst.Secret('OpenAIApiKey'),
    OpenAISystemPrompt: new sst.Secret('OpenAISystemPrompt'),
    OpenAIWritingPrompt: new sst.Secret('OpenAIWritingPrompt'),
    OpenAICoverPrompt: new sst.Secret('OpenAICoverPrompt'),
}

export const allSecrets = Object.values(secret)
