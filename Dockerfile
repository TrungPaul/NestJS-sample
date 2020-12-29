##### DOCKERFILE FOR SPA ######

##### builder image #####
FROM node:12-alpine AS builder

LABEL maintainer="Trung" \
      description="Lightweight container with Node 12.13.1 based on Alpine Linux."

EXPOSE 3000
WORKDIR /app

ADD package.json yarn.lock /app/
RUN yarn --pure-lockfile

ADD src /app

# Add Timezone Data
RUN apk add tzdata

RUN yarn build
##### end builder image #####

##### runtime image (production) #####
FROM nginx:alpine

LABEL maintainer="Trung" \
      description="Lightweight container with Nginx based on Alpine Linux."

RUN apk update && apk add --no-cache apache2-utils && apk add tzdata

COPY ./config-nginx/script/start.sh /
COPY config-nginx/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY config-nginx/nginx/.htpasswd /etc/nginx/.htpasswd
COPY --from=builder /app/build /usr/share/nginx/html

#CMD ["nginx", "-g", "daemon off;"]
CMD ["/start.sh"]
##### end runtime image (production) #####

##### END DOCKERFILE FOR SPA #####
