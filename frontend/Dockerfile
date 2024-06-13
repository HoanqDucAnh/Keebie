FROM node:18-alpine AS build
WORKDIR /app/frontend
COPY ./package.json ./
COPY ./yarn.lock ./
RUN --mount=type=cache,target=/root/.yarn YARN_CACHE_FOLDER=/root/.yarn yarn install
COPY ./src ./src
COPY ./public ./public
COPY ./tailwind.config.js ./
RUN yarn build

FROM nginx:alpine
COPY --from=build /app/frontend/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]