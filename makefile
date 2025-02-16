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
	npx sst shell pnpm nx run web:build

commit:
	git add .
	better-commits

# MUST use node18 for the preview server to work.
preview:
	pnpm nx run transactional:preview

# DATA MODELLING
push-db:
	npx sst shell drizzle-kit push

pull-db:
	npx sst shell drizzle-kit pull

migrate-generate:
	npx sst shell drizzle-kit generate

migrate-apply:
	npx sst shell drizzle-kit migrate

seed:
	npx sst shell tsx ops/seed.ts

# CICD
cicd-lint:
	pnpm nx affected -t lint

cicd-typecheck:
	pnpm nx affected -t typecheck

cicd-deploy:
	npx sst deploy --stage production --verbose

# DEPENDENCY MANAGEMENT
update:
	pnpm up --interactive --filter ${filter}

update-latest:
	pnpm up --latest --interactive --filter ${filter}
