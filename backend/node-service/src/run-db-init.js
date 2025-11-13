#!/usr/bin/env node

/**
 * One-time database initialization script
 * Can be run manually in Render Shell or as a one-off job
 * 
 * Usage in Render:
 *   1. Go to your Node service in Render dashboard
 *   2. Click "Shell" tab
 *   3. Run: node src/run-db-init.js
 */

import dotenv from 'dotenv';
import pkg from 'pg';
import { ensureBasicTables } from './init-db.js';

const { Pool } = pkg;

dotenv.config();

const MAX_RETRIES = 3;

async function main() {
  console.log('======================================');
  console.log('Database Initialization Script');
  console.log('======================================\n');

  if (!process.env.DATABASE_URL) {
    console.error('❌ ERROR: DATABASE_URL environment variable not set');
    process.exit(1);
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    // Test connection
    console.log('🔌 Testing database connection...');
    const result = await pool.query('SELECT NOW() as now, version() as version');
    console.log('✅ Connected to database');
    console.log(`   Time: ${result.rows[0].now}`);
    console.log(`   PostgreSQL: ${result.rows[0].version.split(',')[0]}\n`);

    // Check existing tables
    console.log('🔍 Checking existing tables...');
    const tables = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
    
    if (tables.rows.length > 0) {
      console.log('   Found tables:');
      tables.rows.forEach(row => console.log(`   - ${row.table_name}`));
    } else {
      console.log('   No tables found');
    }
    console.log('');

    // Initialize tables
    console.log('🔧 Initializing database tables...');
    await ensureBasicTables(pool);

    // Verify
    console.log('\n📊 Verification:');
    
    const securityEventsCount = await pool.query('SELECT COUNT(*) FROM security_events');
    console.log(`   Security Events: ${securityEventsCount.rows[0].count} records`);

    const itemsCheck = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'items'
      )
    `);
    
    if (itemsCheck.rows[0].exists) {
      const itemsCount = await pool.query('SELECT COUNT(*) FROM items');
      console.log(`   Items: ${itemsCount.rows[0].count} records`);
    }

    console.log('\n======================================');
    console.log('✅ Database initialization complete!');
    console.log('======================================\n');

    await pool.end();
    process.exit(0);

  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    console.error('\nStack trace:');
    console.error(error.stack);
    await pool.end();
    process.exit(1);
  }
}

main();

