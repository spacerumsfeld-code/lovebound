import { z } from 'zod'

export const featureFlagSchema = z.object({
    FEATURE_AUDIO_NARRATION: z.string(),
})
export type TFeatureFlag = z.infer<typeof featureFlagSchema>

export const featureFlags = featureFlagSchema.parse(
    Object.fromEntries(
        Object.entries(process.env).filter(([key]) =>
            key.startsWith('FEATURE_'),
        ),
    ),
)

export const getFeature = (feature: keyof TFeatureFlag): boolean => {
    return Boolean(featureFlags[feature]) === true
}
