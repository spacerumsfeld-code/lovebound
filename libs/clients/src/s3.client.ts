import crypto from 'crypto'
// import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { Resource } from 'sst'

const client = new S3Client({})

export const uploadBase64Image = async (imageData: string) => {
    const imageBuffer = Buffer.from(imageData, 'base64')
    const key = `cover-images/${crypto.randomUUID()}.png`

    const command = new PutObjectCommand({
        Bucket: Resource.Bucket.name,
        Key: key,
        Body: imageBuffer,
        ContentType: 'image/png',
    })

    await client.send(command)

    return `https://${Resource.Bucket.name}.s3.amazonaws.com/${key}`
}
