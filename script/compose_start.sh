#!/bin/bash

# !!! Please run this file in root project folder
# This file is a shortcut for `docker-compose up`
# USAGE:
# $ script/compose_start.sh [environment]
# EG:
# $ script/compose_start.sh
# $ script/compose_start.sh dev

environment=$1

case "$environment" in

    dev)
      docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
      ;;

    staging)
        docker-compose -f docker-compose.yml -f docker-compose.staging.yml up -d
        ;;

    *)
        docker-compose -f docker-compose.yml up -d
esac
