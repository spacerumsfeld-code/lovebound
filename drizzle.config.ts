import { defineConfig } from 'drizzle-kit'

export default defineConfig({
    schema: ['libs/core/src/**/*.model.ts'],
    dialect: 'postgresql',
    out: './migrations',
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
})
