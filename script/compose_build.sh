#!/bin/bash

# !!! Please run this file in root project folder
# This file is a shortcut for `docker-compose build`
# USAGE:
# $ script/compose_build.sh [environment]
# EG:
# $ script/compose_build.sh
# $ script/compose_build.sh dev

environment=$1

case "$environment" in
    local)
        docker-compose -f docker-compose.builder.yml -f docker-compose.local.yml build
        ;;

    dev)
      docker-compose -f docker-compose.yml -f docker-compose.dev.yml build
      ;;

    staging)
      docker-compose -f docker-compose.yml -f docker-compose.staging.yml build
      ;;

    *)
        docker-compose -f docker-compose.yml build
esac
