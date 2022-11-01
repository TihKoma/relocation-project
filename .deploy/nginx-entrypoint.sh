#!/bin/bash

echo "NICITY_ENV: ${NICITY_ENV}"
echo "AWS_REGION: ${AWS_REGION}"

if [ "${NICITY_ENV}" == "prod" ]; then
  export NGINX_ANDROID_ENV="prod"
else
  export NGINX_ANDROID_ENV="dev"
fi

echo "NGINX_ANDROID_ENV: ${NGINX_ANDROID_ENV}"

# shellcheck disable=SC2016
envsubst '${NGINX_ANDROID_ENV},${AWS_REGION},${NICITY_ENV},${NGINX_RESOLVER}' </etc/nginx/conf.d/default.template >/etc/nginx/conf.d/default.conf

nginx -t

exec nginx -g "daemon off;"
