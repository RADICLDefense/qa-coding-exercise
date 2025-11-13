# Database Setup

This directory contains database initialization scripts and documentation for the PostgreSQL database used in the RADICL application.

## PostgreSQL via Docker Compose

The project uses Docker Compose to run PostgreSQL in a container, making it easy to set up and tear down the database environment.

## Quick Start

### 1. Start the Database

From the project root:

```bash
docker compose up -d
```

This will:
- Download the PostgreSQL Alpine image (if not already present)
- Create a PostgreSQL container named `radicl-postgres`
- Initialize the database with the scripts in `database/init/`
- Expose PostgreSQL on port 5432

### 2. Verify the Database is Running

```bash
docker compose ps
```

You should see the `radicl-postgres` container with status "Up" and healthy.

### 3. Connect to the Database

**Using psql command line:**
```bash
docker compose exec postgres psql -U radicl_user -d radicl_db
```

**Using a GUI client (like pgAdmin, DBeaver, TablePlus):**
- Host: `localhost`
- Port: `5432`
- Database: `radicl_db`
- Username: `radicl_user`
- Password: `radicl_password`

## Configuration

### Environment Variables

Database configuration is pre-configured using environment variables in the included `.env` files:

```env
# PostgreSQL Database Configuration
POSTGRES_DB=radicl_db
POSTGRES_USER=radicl_user
POSTGRES_PASSWORD=radicl_password
POSTGRES_PORT=5432

# Connection URLs for application services
DATABASE_URL=postgresql://radicl_user:radicl_password@localhost:5432/radicl_db

# Go service connection details
DB_HOST=localhost
DB_PORT=5432
DB_NAME=radicl_db
DB_USER=radicl_user
DB_PASSWORD=radicl_password
DB_SSLMODE=disable
```

### Default Credentials

**⚠️ For development only! Change these in production!**

- **Database:** radicl_db
- **Username:** radicl_user
- **Password:** radicl_password
- **Port:** 5432

## Database Schema

The database is automatically initialized with the following schema:

### Tables

**users**
- `id` (UUID, Primary Key)
- `username` (VARCHAR, Unique)
- `email` (VARCHAR, Unique)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

**items**
- `id` (SERIAL, Primary Key)
- `name` (VARCHAR)
- `description` (TEXT)
- `type` (VARCHAR)
- `user_id` (UUID, Foreign Key → users.id)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Sample Data

The initialization script creates:
- 3 sample users (john_doe, jane_smith, bob_wilson)
- 10 sample items with various types (node, go, react)

## Initialization Scripts

SQL scripts in `database/init/` are executed in alphabetical order when the container is first created. The naming convention is:

```
01-init.sql       # Initial schema and tables
02-seed.sql       # Additional seed data (optional)
03-functions.sql  # Stored procedures (optional)
```

**Note:** Scripts only run on first container creation. If you modify scripts:

1. Stop and remove the container:
   ```bash
   docker compose down -v
   ```

2. Restart to run updated scripts:
   ```bash
   docker compose up -d
   ```

## Docker Compose Commands

**Start the database:**
```bash
docker compose up -d
```

**Stop the database:**
```bash
docker compose stop
```

**Stop and remove container (keeps data volume):**
```bash
docker compose down
```

**Stop, remove container AND delete all data:**
```bash
docker compose down -v
```

**View logs:**
```bash
docker compose logs postgres
docker compose logs -f postgres  # Follow logs
```

**Check health status:**
```bash
docker compose ps
```

**Execute SQL queries:**
```bash
docker compose exec postgres psql -U radicl_user -d radicl_db -c "SELECT * FROM users;"
```

## Data Persistence

Database data is persisted in a Docker volume named `postgres_data`. This means:
- Data survives container restarts
- Data survives `docker compose down`
- Data is deleted with `docker compose down -v`

To backup the data:
```bash
docker compose exec postgres pg_dump -U radicl_user radicl_db > backup.sql
```

To restore from backup:
```bash
docker compose exec -T postgres psql -U radicl_user -d radicl_db < backup.sql
```

## Connecting from Application Services

### Node.js (with pg library)

```bash
cd backend/node-service
npm install pg
```

```javascript
import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Query example
const result = await pool.query('SELECT * FROM users');
console.log(result.rows);
```

### Go (with pgx library)

```bash
cd backend/go-service
go get github.com/jackc/pgx/v5
```

```go
import (
    "context"
    "github.com/jackc/pgx/v5/pgxpool"
)

connString := fmt.Sprintf(
    "host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
    os.Getenv("DB_HOST"),
    os.Getenv("DB_PORT"),
    os.Getenv("DB_USER"),
    os.Getenv("DB_PASSWORD"),
    os.Getenv("DB_NAME"),
    os.Getenv("DB_SSLMODE"),
)

pool, err := pgxpool.New(context.Background(), connString)
if err != nil {
    log.Fatal(err)
}
defer pool.Close()

// Query example
rows, err := pool.Query(context.Background(), "SELECT * FROM users")
```

## Troubleshooting

### Port Already in Use

If port 5432 is already in use, change it in your `.env` file:
```env
POSTGRES_PORT=5433
```

Then update connection strings accordingly.

### Container Won't Start

Check logs:
```bash
docker compose logs postgres
```

Common issues:
- Port conflict (change POSTGRES_PORT)
- Permission issues with volumes
- Previous container not cleaned up (`docker compose down -v`)

### Can't Connect from Application

1. Verify container is running: `docker compose ps`
2. Check health status: `docker compose exec postgres pg_isready`
3. Verify credentials match your `.env` file
4. Ensure you're using `localhost` (not `127.0.0.1` on some systems)

### Reset Everything

To completely reset the database:
```bash
docker compose down -v
docker compose up -d
```

This will delete all data and reinitialize from scratch.

## Production Considerations

For production deployment:

1. **Change default credentials** - Use strong, unique passwords
2. **Enable SSL/TLS** - Set `DB_SSLMODE=require`
3. **Use managed database** - Consider AWS RDS, Google Cloud SQL, etc.
4. **Implement backups** - Regular automated backups
5. **Configure connection pooling** - Optimize connection limits
6. **Monitor performance** - Set up monitoring and alerting
7. **Restrict network access** - Use firewalls and security groups

## Additional Resources

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Node.js pg Library](https://node-postgres.com/)
- [Go pgx Library](https://github.com/jackc/pgx)

