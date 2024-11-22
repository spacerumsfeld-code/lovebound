import { defineConfig } from 'drizzle-kit'

export default defineConfig({
    schema: ['./src/domain/**/*.sql.ts'],
    dialect: 'postgresql',
    out: './migrations',
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
})
