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
	npx sst shell drizzle-kit migrate

seed:
	 npx sst shell tsx ops/seed.ts

# CICD
cicd-lint:
	pnpm nx affected -t lint

cicd-typecheck:
	pnpm nx affected -t typecheck

# cicd-deploy-test-infra:
# 	npx sst deploy --stage test

# cicd-test:
# 	pnpm nx run web:test

cicd-deploy:
	npx sst deploy --stage production

# DEPENDENCY MANAGEMENT
update:
	pnpm up --interactive --filter ${filter}

update-latest:
	pnpm up --latest --interactive --filter ${filter}
