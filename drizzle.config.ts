import { defineConfig } from 'drizzle-kit'
import { Resource } from 'sst'
import './sst-env.d.ts'

export default defineConfig({
    schema: ['libs/core/src/**/*.sql.ts'],
    dialect: 'postgresql',
    out: './migrations',
    dbCredentials: {
        url: Resource.DatabaseUrl.value,
    },
})
