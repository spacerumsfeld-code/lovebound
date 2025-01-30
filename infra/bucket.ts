import type {} from '../.sst/platform/config'

export const bucket = new sst.aws.Bucket('Bucket', {
    access: 'public',
})

export const outputs = {
    bucketName: bucket.name,
}
