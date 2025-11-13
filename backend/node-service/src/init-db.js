import pkg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const { Pool } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Initialize database with required tables and data
 * This runs automatically on service startup
 */
export async function initializeDatabase(pool) {
  console.log('🔍 Checking database initialization...');

  try {
    // Check if security_events table exists
    const tableCheck = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'security_events'
      );
    `);

    const tableExists = tableCheck.rows[0].exists;

    if (tableExists) {
      console.log('✅ Database already initialized');
      
      // Check if we have data
      const countResult = await pool.query('SELECT COUNT(*) FROM security_events');
      const count = parseInt(countResult.rows[0].count);
      console.log(`📊 Found ${count} security events in database`);
      
      return true;
    }

    console.log('⚠️  Database tables not found - initializing...');

    // Run initialization scripts
    await runInitScripts(pool);

    console.log('✅ Database initialization complete!');
    return true;

  } catch (error) {
    console.error('❌ Database initialization error:', error.message);
    console.error('⚠️  Service will continue, but database operations may fail');
    return false;
  }
}

/**
 * Run SQL initialization scripts
 */
async function runInitScripts(pool) {
  const scripts = [
    '../../database/init/01-init.sql',
    '../../database/init/02-security-data.sql',
    '../../database/init/03-additional-security-data.sql'
  ];

  for (const scriptPath of scripts) {
    try {
      const fullPath = path.join(__dirname, scriptPath);
      
      // Check if file exists
      if (!fs.existsSync(fullPath)) {
        console.log(`⚠️  Script not found: ${scriptPath}`);
        console.log(`   (This is expected on Render - tables may need manual initialization)`);
        continue;
      }

      console.log(`📝 Running: ${path.basename(scriptPath)}...`);
      const sql = fs.readFileSync(fullPath, 'utf8');
      
      // Execute the SQL script
      await pool.query(sql);
      
      console.log(`✅ Completed: ${path.basename(scriptPath)}`);
    } catch (error) {
      console.error(`❌ Error running ${scriptPath}:`, error.message);
      // Continue with next script even if one fails
    }
  }
}

/**
 * Ensure basic tables exist (fallback if SQL files not available)
 */
export async function ensureBasicTables(pool) {
  console.log('🔧 Ensuring basic table structure...');
  
  try {
    // Create security_events table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS security_events (
        event_id SERIAL PRIMARY KEY,
        event_type VARCHAR(100) NOT NULL,
        severity VARCHAR(20) NOT NULL,
        status VARCHAR(50) NOT NULL,
        timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
        source_ip VARCHAR(50),
        target_system VARCHAR(200),
        description TEXT,
        threat_score INTEGER,
        affected_users INTEGER,
        location VARCHAR(100),
        country_code VARCHAR(10),
        resolution_time INTEGER,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create indexes for better performance
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_security_events_timestamp 
      ON security_events(timestamp DESC);
    `);

    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_security_events_severity 
      ON security_events(severity);
    `);

    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_security_events_status 
      ON security_events(status);
    `);

    console.log('✅ Basic table structure ensured');
    
    // Check if we need sample data
    const countResult = await pool.query('SELECT COUNT(*) FROM security_events');
    const count = parseInt(countResult.rows[0].count);
    
    if (count === 0) {
      console.log('📝 Inserting sample security events...');
      await insertSampleData(pool);
    }
    
    return true;
  } catch (error) {
    console.error('❌ Error ensuring basic tables:', error.message);
    return false;
  }
}

/**
 * Insert minimal sample data if tables are empty
 */
async function insertSampleData(pool) {
  const sampleEvents = [
    {
      event_type: 'Unauthorized Access Attempt',
      severity: 'Critical',
      status: 'INVESTIGATING',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      source_ip: '192.168.1.100',
      target_system: 'Production Database',
      description: 'Multiple failed authentication attempts detected',
      threat_score: 95,
      affected_users: 0,
      location: 'New York',
      country_code: 'US'
    },
    {
      event_type: 'DDoS Attack',
      severity: 'High',
      status: 'MITIGATING',
      timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 min ago
      source_ip: '203.0.113.45',
      target_system: 'Web Server Farm',
      description: 'Distributed denial of service attack in progress',
      threat_score: 88,
      affected_users: 1500,
      location: 'San Francisco',
      country_code: 'US'
    },
    {
      event_type: 'Malware Detection',
      severity: 'Medium',
      status: 'RESOLVED',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      source_ip: '10.0.0.50',
      target_system: 'Workstation-425',
      description: 'Trojan detected and quarantined',
      threat_score: 65,
      affected_users: 1,
      location: 'Chicago',
      country_code: 'US',
      resolution_time: 15
    }
  ];

  for (const event of sampleEvents) {
    try {
      await pool.query(`
        INSERT INTO security_events (
          event_type, severity, status, timestamp,
          source_ip, target_system, description, threat_score,
          affected_users, location, country_code, resolution_time
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      `, [
        event.event_type, event.severity, event.status,
        event.timestamp, event.source_ip, event.target_system, event.description,
        event.threat_score, event.affected_users, event.location,
        event.country_code, event.resolution_time
      ]);
    } catch (error) {
      console.error(`Error inserting sample event:`, error.message);
    }
  }

  console.log('✅ Sample data inserted');
}

