import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { generateId } from '@utils'
import { Resource } from 'sst'

const client = new S3Client({})

const uploadImageFromUrl = async (url: string) => {
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`)
    }
    const imageBuffer = await response.arrayBuffer()

    const key = `cover/${generateId()}.png`

    const command = new PutObjectCommand({
        Bucket: Resource.Bucket.name,
        Key: key,
        Body: Buffer.from(imageBuffer),
        ContentType: 'image/png',
    })

    await client.send(command)

    return `https://${Resource.Bucket.name}.s3.amazonaws.com/${key}`
}

const uploadAudioFromBuffer = async (buffer: Buffer, storyId: number) => {
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

const s3Client = {
    uploadImageFromUrl,
    uploadAudioFromBuffer,
}

export { s3Client }
