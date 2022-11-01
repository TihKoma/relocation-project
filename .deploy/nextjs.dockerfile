FROM 701347834014.dkr.ecr.eu-central-1.amazonaws.com/nicity/devops/dockerfiles/nodejs:16-main

WORKDIR /app

ENV NODE_ENV=production

COPY package.json package-lock.json ./

RUN npm ci --audit=false --ignore-scripts && \
    npm rebuild sharp

COPY .next ./.next
COPY public ./public
COPY package.json ./package.json
COPY package-lock.json ./package-lock.json

COPY .deploy/nextjs-entrypoint.sh /entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/entrypoint.sh"]
