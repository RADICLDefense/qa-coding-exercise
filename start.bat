@echo off
echo Starting RADICL Full Stack Application...
echo.

:: Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Node.js is not installed. Please install Node.js 20.19+ or 22.12+ first.
    echo We recommend using nvm-windows: https://github.com/coreybutler/nvm-windows
    exit /b 1
)

:: Check Node.js version (Vite 7 requires 20.19+ or 22.12+)
for /f "tokens=1" %%v in ('node -v') do set NODE_VERSION=%%v
echo Node.js version: %NODE_VERSION%
echo WARNING: Please ensure you have Node.js 20.19+ or 22.12+ for Vite 7 compatibility
echo.

:: Check if Go is installed
where go >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Go is not installed. Please install Go 1.21+ first.
    exit /b 1
)

:: Check if Docker is installed
where docker >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Docker is not installed. Please install Docker first.
    exit /b 1
)

:: Check if Docker Compose is installed
docker compose version >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Docker Compose is not installed. Please install Docker Compose first.
    exit /b 1
)

echo Prerequisites check passed
echo.

echo Environment configuration included
echo.

:: Start PostgreSQL database
echo Starting PostgreSQL database...
docker compose up -d
timeout /t 3 /nobreak >nul

echo Waiting for database to be ready...
for /L %%i in (1,1,30) do (
    docker compose exec -T postgres pg_isready -U radicl_user >nul 2>nul
    if %ERRORLEVEL% EQU 0 (
        echo Database is ready!
        goto :dbready
    )
    timeout /t 1 /nobreak >nul
)
echo Warning: Database is taking longer than expected to start
echo Check 'docker compose logs postgres' for details

:dbready
echo.

:: Install dependencies if needed
if not exist "frontend\node_modules" (
    echo Installing frontend dependencies...
    cd frontend
    call npm install
    cd ..
)

if not exist "backend\node-service\node_modules" (
    echo Installing Node.js backend dependencies...
    cd backend\node-service
    call npm install
    cd ..\..
)

if not exist "backend\go-service\go.sum" (
    echo Installing Go backend dependencies...
    cd backend\go-service
    go mod tidy
    cd ..\..
)

echo.
echo Starting all services...
echo.
echo    PostgreSQL DB:   localhost:5432
echo    Node.js Backend: http://localhost:3001
echo    Go Backend:      http://localhost:3002
echo    React Frontend:  http://localhost:5173
echo.
echo Press Ctrl+C to stop all services
echo Note: Database will continue running. Use 'docker compose stop' to stop it.
echo.

:: Start all services using npm concurrently
call npm run start:all

