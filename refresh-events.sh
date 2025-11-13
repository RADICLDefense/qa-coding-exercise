#!/bin/bash

# Refresh Security Events Script
# This script updates the security event timestamps to be recent

echo "🔄 Refreshing security event timestamps..."

# Run the SQL script in the postgres container
docker exec -i radicl-postgres psql -U radicl_user -d radicl_db -f - < database/refresh-security-events.sql

if [ $? -eq 0 ]; then
    echo "✅ Security events refreshed successfully!"
    echo "🔄 Refresh your dashboard to see updated times"
else
    echo "❌ Error refreshing security events"
    echo "Make sure the database container is running (docker compose up -d)"
fi

