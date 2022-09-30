FROM node:14-alpine AS builder
ENV NODE_ENV production
# Add a work directory
WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production
# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html
# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY security.conf /etc/nginx/conf.d/security.conf
COPY general.conf /etc/nginx/conf.d/general.conf
# Expose port
EXPOSE 8080
# Start nginx
CMD ["nginx", "-g", "daemon off;"]