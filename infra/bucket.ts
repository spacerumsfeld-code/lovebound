/// <reference path="../.sst/platform/config.d.ts" />

export const bucket = new sst.aws.Bucket('Bucket', {
    access: 'public',
})

export const outputs = {
    bucketName: bucket.name,
}
