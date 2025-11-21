# Pull official node image as base
FROM node:24-alpine3.21 as build

# Set working directory
WORKDIR /disscover

# Install dependencies
COPY package.json ./
COPY package-lock.json ./

RUN npm install npm@11.6.3

# Copy application
COPY . ./

# Generate Type Files
RUN npm install typescript -g

RUN tsc 'src/app/GenerateTypes.ts' --outDir 'src/app'
RUN cp 'src/app/GenerateTypes.js' 'src/app/GenerateTypes.cjs'
RUN rm 'src/app/GenerateTypes.js'
RUN node 'src/app/GenerateTypes.cjs'

# Set env variables
ARG VITE_KEYCLOAK_CLIENT
ENV VITE_KEYCLOAK_CLIENT ${VITE_KEYCLOAK_CLIENT}
ARG VITE_KEYCLOAK_SERVER
ENV VITE_KEYCLOAK_SERVER ${VITE_KEYCLOAK_SERVER}
ARG VITE_KEYCLOAK_REALM
ENV VITE_KEYCLOAK_REALM ${VITE_KEYCLOAK_REALM}

# Setting app to production build
RUN npm run build

# Setting up NGINX
FROM nginx:alpine

COPY --from=build /disscover/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 3000

# Start application
CMD ["nginx", "-g", "daemon off;"]