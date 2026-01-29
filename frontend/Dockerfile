FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Build-time API URL
ARG API_URL=http://localhost:8000
ENV NEXT_PUBLIC_API_URL=$API_URL

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
