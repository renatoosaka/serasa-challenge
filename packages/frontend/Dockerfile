FROM node:20-alpine AS build

WORKDIR /app

COPY package.json ./
RUN yarn install

COPY . .

RUN rm -f .env
RUN echo "VITE_API_URL=http://localhost:4000/api" > .env
RUN cat .env

RUN yarn build

FROM nginx:alpine

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
