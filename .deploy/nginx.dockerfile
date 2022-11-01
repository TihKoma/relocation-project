FROM 701347834014.dkr.ecr.eu-central-1.amazonaws.com/nicity/devops/dockerfiles/nginx:main

COPY .deploy/nginx.conf /etc/nginx/conf.d/default.template

# Smoke test
RUN test -e /var/run || ln -s /run /var/run && \
    nginx -t

COPY .deploy/nginx-entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
