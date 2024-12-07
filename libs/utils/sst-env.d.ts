/* This file is auto-generated by SST. Do not edit. */
/* tslint:disable */
/* eslint-disable */
/* deno-fmt-ignore-file */
import "sst"
export {}
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
    "CrispWebsiteId": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "DatabaseUrl": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "InngestBranchId": {
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
    "OpenAIApiKey": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "Orchestration": {
      "name": string
      "type": "sst.aws.Function"
      "url": string
    }
    "Server": {
      "name": string
      "type": "sst.aws.Function"
      "url": string
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
    "Web": {
      "type": "sst.aws.Nextjs"
      "url": string
    }
    "WebsocketApi": {
      "managementEndpoint": string
      "type": "sst.aws.ApiGatewayWebSocket"
      "url": string
    }
  }
}
