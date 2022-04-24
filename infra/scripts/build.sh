#!/bin/bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

source $SCRIPT_DIR/setenv.sh

echo "hi ${DOCKER_REGISTRY}"

service=$1

docker-compose build $service

version=$(sh $SCRIPT_DIR/get-current-commit-hash.sh)

docker tag ${DOCKER_REGISTRY}${service} ${DOCKER_REGISTRY}${service}:$version

docker push ${DOCKER_REGISTRY}${service}:$version