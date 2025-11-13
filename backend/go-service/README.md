# Go Backend Service

A REST API service built with Go and Gorilla Mux that connects to a PostgreSQL database.

## Features

- Gorilla Mux router
- CORS enabled
- PostgreSQL database connection using `pgx/v5`
- Environment variable configuration with `godotenv`
- Health check endpoint
- Database-driven API endpoints

## Setup

1. Install dependencies:
```bash
go mod tidy
```

2. Make sure PostgreSQL is running (via Docker Compose):
```bash
# From the project root
docker compose up -d
```

3. Run the service:
```bash
go run main.go
```

Or build and run:
```bash
go build -o go-service
./go-service
```

The service will run on `http://localhost:3002`

## API Endpoints

- `GET /api/health` - Health check endpoint
- `GET /api/go/hello` - Hello world endpoint
- `GET /api/go/data` - Fetches items from PostgreSQL database where type='go'

## Scripts

- `go run main.go` - Run the service
- `go build` - Build the binary
- `go test ./...` - Run tests

