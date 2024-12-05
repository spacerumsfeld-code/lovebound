# DEVELOPMENT
dev:
	npx sst dev

lint:
	pnpm nx run-many --target=lint --all

typecheck:
	pnpm nx run-many --target=typecheck --all

# DATA MODELLING
push-db:
	npx drizzle-kit push

pull-db:
	npx drizzle-kit pull

migrate-generate:
	npx drizzle-kit generate

migrate-apply:
	npx drizzle-kit migrate

seed:
	DATABASE_URL="postgresql://neondb_owner:3rDmNUvo9IqF@ep-wandering-tree-a5ykn0je-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require" npx sst shell tsx ops/seed.ts

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
