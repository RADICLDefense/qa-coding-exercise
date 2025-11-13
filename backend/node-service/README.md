# Node.js Backend Service

A REST API service built with Express.js that connects to a PostgreSQL database.

## Features

- Express.js web framework
- CORS enabled
- PostgreSQL database connection using `pg`
- Environment variable configuration
- Health check endpoint
- Database-driven API endpoints

## Setup

1. Install dependencies:
```bash
npm install
```

3. Make sure PostgreSQL is running (via Docker Compose):
```bash
# From the project root
docker compose up -d
```

4. Start the development server:
```bash
npm run dev
```

The service will run on `http://localhost:3001`

## API Endpoints

- `GET /api/health` - Health check endpoint
- `GET /api/node/hello` - Hello world endpoint
- `GET /api/node/data` - Fetches items from PostgreSQL database where type='node'

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm start` - Start production server
- `npm test` - Run tests

