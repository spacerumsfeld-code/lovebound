# DEVELOPMENT
web:
	npx sst dev

# TESTING

test-e2e: web-build
	pnpm nx run web:test --skip-nx-cache

# DATA MODELLING
push-db:
	npx drizzle-kit push

generate-migration:
	npx drizzle-kit generate

apply-migration:
	npx drizzle-kit migrate

seed:
	DATABASE_URL=[changeme] npx tsx ops/seed.ts


# DEPENDENCY MANAGEMENT
update:
	pnpm up --interactive --filter ${filter}

update-latest:
	pnpm up --latest --interactive --filter ${filter}

# CICD

cicd-generate-types:
	pnpm sst types

cicd-deploy-test-infra:
	pnpm sst deploy --stage test

cicd-build-web:
	pnpm nx run web:build

cicd-install-e2e-deps:
	pnpm nx run web:e2e-install-deps

cicd-deploy-web:
	pnpm nx run web:deploy

cicd-generate-jwts:
	npx ts-node ops/generateTestJwts.ts
