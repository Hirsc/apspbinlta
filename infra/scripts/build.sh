#!/bin/bash

BASEDIR="$PWD"

service=$1

docker-compose build $service

version=$(sh $BASEDIR/../infra/scripts/get-current-commit-hash.sh)

docker tag $service $service:$version