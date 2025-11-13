#!/bin/bash

echo "🚀 Starting RADICL Full Stack Application..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 20.19+ or 22.12+ first."
    echo "   We recommend using nvm: https://github.com/nvm-sh/nvm"
    exit 1
fi

# Check Node.js version (Vite 7 requires 20.19+ or 22.12+)
NODE_VERSION=$(node -v | cut -d'v' -f2)
NODE_MAJOR=$(echo $NODE_VERSION | cut -d'.' -f1)
NODE_MINOR=$(echo $NODE_VERSION | cut -d'.' -f2)

if [ "$NODE_MAJOR" -lt 20 ] || ([ "$NODE_MAJOR" -eq 20 ] && [ "$NODE_MINOR" -lt 19 ]); then
    if [ "$NODE_MAJOR" -ne 22 ] || ([ "$NODE_MAJOR" -eq 22 ] && [ "$NODE_MINOR" -lt 12 ]); then
        echo "❌ Node.js version $NODE_VERSION is too old."
        echo "   Vite 7 requires Node.js 20.19+ or 22.12+"
        echo "   Your version: v$NODE_VERSION"
        echo ""
        echo "   To upgrade using nvm:"
        echo "   nvm install 20.19"
        echo "   nvm use 20.19"
        exit 1
    fi
fi

echo "✅ Node.js version: v$NODE_VERSION"

# Check if Go is installed
if ! command -v go &> /dev/null; then
    echo "❌ Go is not installed. Please install Go 1.21+ first."
    exit 1
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed (v1 or v2)
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Determine which docker-compose command to use
if command -v docker-compose &> /dev/null; then
    DOCKER_COMPOSE="docker-compose"
else
    DOCKER_COMPOSE="docker compose"
fi

echo "✅ Prerequisites check passed"
echo ""

echo "✅ Environment configuration included"
echo ""

# Function to check if port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
        echo "⚠️  Port $1 is already in use"
        return 1
    fi
    return 0
}

# Check ports
echo "🔍 Checking ports..."
check_port 5432 || echo "   PostgreSQL port may conflict"
check_port 3001 || echo "   Node.js service port may conflict"
check_port 3002 || echo "   Go service port may conflict"
check_port 5173 || echo "   Frontend port may conflict"
echo ""

# Start PostgreSQL database
echo "🗄️  Starting PostgreSQL database..."
$DOCKER_COMPOSE up -d
sleep 2

# Wait for database to be healthy
echo "⏳ Waiting for database to be ready..."
for i in {1..30}; do
    if $DOCKER_COMPOSE exec -T postgres pg_isready -U radicl_user > /dev/null 2>&1; then
        echo "✅ Database is ready!"
        break
    fi
    if [ $i -eq 30 ]; then
        echo "⚠️  Database is taking longer than expected to start"
        echo "   Check '$DOCKER_COMPOSE logs postgres' for details"
    fi
    sleep 1
done
echo ""

# Check if database schema exists and initialize if needed
echo "🔍 Checking database schema..."
SCHEMA_EXISTS=$($DOCKER_COMPOSE exec -T postgres psql -U radicl_user -d radicl_db -tAc "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'users');" 2>/dev/null)

if [ "$SCHEMA_EXISTS" = "t" ]; then
    echo "✅ Database schema already initialized"
else
    echo "📝 Initializing database schema..."
    if $DOCKER_COMPOSE exec -T postgres psql -U radicl_user -d radicl_db < database/init/01-init.sql > /dev/null 2>&1; then
        echo "✅ Database initialized successfully!"
    else
        echo "⚠️  Failed to initialize database. Trying alternative method..."
        # Alternative method: copy file into container and execute
        docker cp database/init/01-init.sql radicl-postgres:/tmp/01-init.sql
        $DOCKER_COMPOSE exec -T postgres psql -U radicl_user -d radicl_db -f /tmp/01-init.sql
        echo "✅ Database initialized successfully!"
    fi
fi
echo ""

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing root dependencies..."
    npm install
fi

if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd frontend && npm install && cd ..
fi

if [ ! -d "backend/node-service/node_modules" ]; then
    echo "📦 Installing Node.js backend dependencies..."
    cd backend/node-service && npm install && cd ../..
fi

if [ ! -f "backend/go-service/go.sum" ]; then
    echo "📦 Installing Go backend dependencies..."
    cd backend/go-service && go mod tidy && cd ../..
fi

echo ""
echo "🎬 Starting all services..."
echo ""
echo "   📍 PostgreSQL DB:   localhost:5432"
echo "   📍 Node.js Backend: http://localhost:3001"
echo "   📍 Go Backend:      http://localhost:3002"
echo "   📍 React Frontend:  http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop all services"
echo "Note: Database will continue running. Use '$DOCKER_COMPOSE stop' to stop it."
echo ""

# Start all services using npm concurrently
npm run start:all

