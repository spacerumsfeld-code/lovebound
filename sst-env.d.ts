/* This file is auto-generated by SST. Do not edit. */
/* tslint:disable */
/* eslint-disable */
/* deno-fmt-ignore-file */

declare module "sst" {
  export interface Resource {
    "AuthHandler": {
      "name": string
      "type": "sst.aws.Function"
      "url": string
    }
    "AuthHandlerSigningSecret": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "Bucket": {
      "name": string
      "type": "sst.aws.Bucket"
    }
    "ClerkEncryptionKey": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "ClerkPublishableKey": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "ClerkSecretKey": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "CrispWebsiteId": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "DatabaseUrl": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "Environment": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "InngestEventKey": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "InngestSigningKey": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "LogoUrl": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "OpenAIApiKey": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "Orchestration": {
      "name": string
      "type": "sst.aws.Function"
      "url": string
    }
    "PosthogKey": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "ResendApiKey": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "ResendAudienceId": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "SentryDsn": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "Server": {
      "name": string
      "type": "sst.aws.Function"
      "url": string
    }
    "StripeBillingDashboardUrl": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "StripeHandler": {
      "name": string
      "type": "sst.aws.Function"
      "url": string
    }
    "StripePublishableKey": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "StripeReferralCouponId": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "StripeSecretKey": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "StripeWebhookSecret": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "UpstashRedisToken": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "UpstashRedisUrl": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "Web": {
      "type": "sst.aws.Nextjs"
      "url": string
    }
    "WebUrl": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "WebsocketApi": {
      "managementEndpoint": string
      "type": "sst.aws.ApiGatewayWebSocket"
      "url": string
    }
    "XAIApiKey": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "XAIUrl": {
      "type": "sst.sst.Secret"
      "value": string
    }
  }
}
/// <reference path="sst-env.d.ts" />

import "sst"
export {}