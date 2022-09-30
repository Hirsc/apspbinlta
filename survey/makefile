.PHONY: build

build:
	../infra/scripts/build.sh survey

run:
	export CLEAN_UP_CRON_TIMING='0 0 * * SUN' && npm run start:dev

dev:
	npm run test:watch
