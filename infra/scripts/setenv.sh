#!/usr/bin/env bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

# Show env vars
grep -v '^#' source "$SCRIPT_DIR/.env"

# Export env vars
set -o allexport
source $SCRIPT_DIR/.env
set +o allexport