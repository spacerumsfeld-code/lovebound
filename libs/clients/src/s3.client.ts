import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { Resource } from 'sst'

const client = new S3Client({})

export const uploadAudioFromBuffer = async (
    buffer: Buffer,
    storyId: number,
) => {
    if (!buffer) return null

    const key = `story-${storyId}-narration.mp3`

    try {
        const command = new PutObjectCommand({
            Bucket: Resource.Bucket.name,
            Key: key,
            Body: buffer,
            ContentType: 'audio/mpeg',
        })
        await client.send(command)
    } catch (error) {
        console.error('uploadAudioFromBuffer error', error)
    }

    return `https://${Resource.Bucket.name}.s3.amazonaws.com/${key}`
}
