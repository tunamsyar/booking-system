FROM node:22-bullseye

WORKDIR /app

RUN apt-get update && apt-get install -y sqlite3 curl \
  && rm -rf /var/lib/apt/lists/*

COPY package*.json ./

RUN npm ci

RUN npm install -g nodemon

COPY . .

RUN mkdir -p /app/data

EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3001/api/health || exit 1

CMD ["npx", "nodemon"]
