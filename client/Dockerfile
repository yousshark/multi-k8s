FROM node:alpine as builder
WORKDIR '/app'
# we profit of the cache so before copying all to all (. .) we pull package json and npm install
# because if we make a change in app.js it will only make COPY . . and not the steps before 
# the only time npm install will be played it is when some changes occur in package.json
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
