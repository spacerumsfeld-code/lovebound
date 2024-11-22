# DEVELOPMENT
dev:
	npx sst dev

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

# CICD -- incorporate "affected" command
cicd-lint:
	pnpm nx run-many --target=lint --all

cicd-typecheck:
	pnpm nx run-many --target=typecheck --all

cicd-deploy-test-infra:
	npx sst deploy --stage test

cicd-test:
	pnpm nx run web:test

cicd-deploy:
	npx sst deploy --stage production


