FROM node:18-bookworm-slim AS build

WORKDIR /usr/src/app

ARG REACT_APP_API_URL=http://localhost:5000
ARG REACT_APP_REQUEST_TIMEOUT_MS=30000
ENV REACT_APP_API_URL=${REACT_APP_API_URL}
ENV REACT_APP_REQUEST_TIMEOUT_MS=${REACT_APP_REQUEST_TIMEOUT_MS}

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]