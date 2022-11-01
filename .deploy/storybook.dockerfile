FROM 701347834014.dkr.ecr.eu-central-1.amazonaws.com/docker-proxy/docker.io/library/nginx:1.21-alpine

RUN rm -f /usr/share/nginx/html/*

COPY storybook-static/ /usr/share/nginx/html/
