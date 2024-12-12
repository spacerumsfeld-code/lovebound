# DEVELOPMENT
dev:
	npx sst dev

lint:
	pnpm nx run-many --target=lint --all

typecheck:
	pnpm nx run-many --target=typecheck --all

typecheck-target:
	pnpm nx run ${target}:typecheck

build-web:
	pnpm nx run web:build

# DATA MODELLING
push-db:
	npx drizzle-kit push

pull-db:
	npx drizzle-kit pull

migrate-generate:
	npx sst shell drizzle-kit generate

migrate-apply:
	npx sst shell drizzle-kit migrate

seed:
	npx sst shell tsx ops/seed.ts

# CICD
cicd-lint:
	pnpm nx affected -t lint
# npx nx run-many --target=lint --all

cicd-typecheck:
	pnpm nx affected -t typecheck
# pnpm nx run-many --target=typecheck --all

cicd-deploy:
	npx sst deploy --stage production

# DEPENDENCY MANAGEMENT
update:
	pnpm up --interactive --filter ${filter}

update-latest:
	pnpm up --latest --interactive --filter ${filter}
