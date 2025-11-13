import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pkg from 'pg';
import { z } from 'zod';
import { initializeDatabase, ensureBasicTables } from './init-db.js';
const { Pool } = pkg;

dotenv.config();

// Zod Schemas for validation
const SecurityEventQuerySchema = z.object({
  search: z.string().optional(),
  severity: z.enum(['High', 'Medium', 'Low']).optional(),
  limit: z.string().transform(Number).pipe(z.number().min(1).max(100)).optional()
});

const CreateSecurityEventSchema = z.object({
  event_type: z.enum(['Malware', 'Phishing', 'DDoS', 'Intrusion', 'Data Breach', 'Ransomware', 'Suspicious Activity']),
  severity: z.enum(['Critical', 'High', 'Medium', 'Low']),
  status: z.enum(['Active', 'Investigating', 'Resolved', 'False Positive']),
  source_ip: z.string(),
  target_system: z.string().min(1),
  description: z.string().min(10).max(500),
  threat_score: z.string(),
  affected_users: z.number().int().min(1)
});

const RefreshEventsSchema = z.object({
  interval: z.number().min(1).max(60).optional().default(5),
  event_count: z.number().int().min(1).max(50).optional().default(10)
});

const app = express();
const PORT = process.env.PORT || 3001;
const DEFAULT_TIMEOUT = 5000;

// Database connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Test database connection
pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    service: 'node-service',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/node/hello', (req, res) => {
  res.json({ 
    message: 'Hello from Node.js service!',
    version: '1.0.0'
  });
});

app.get('/api/node/data', async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, type, description, created_at FROM items WHERE type = 'node' ORDER BY id"
    );
    res.json({ 
      data: result.rows
    });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Failed to fetch data from database' });
  }
});

// Security Events Endpoints
app.get('/api/security/events', async (req, res) => {
  try {
    // Validate query parameters with Zod (using safeParse - non-throwing)
    const validationResult = SecurityEventQuerySchema.safeParse(req.query);
    
    if (!validationResult.success) {
      return res.status(400).json({ 
        error: 'Invalid query parameters',
        details: validationResult.error.format()
      });
    }
    
    const { search, severity, limit } = validationResult.data;
    
    let query = `SELECT 
      event_id,
      event_type,
      severity,
      status,
      timestamp,
      source_ip,
      target_system,
      description,
      threat_score,
      affected_users
    FROM security_events`;
    
    const conditions = [];
    const params = [];
    let paramCount = 1;
    
    if (search) {
      query += ` WHERE event_type = '${search}'`;
    }
    
    // But properly parameterized for severity
    if (severity) {
      const severityCondition = conditions.length > 0 ? 'AND' : 'WHERE';
      query += ` ${severityCondition} severity = $${paramCount}`;
      params.push(severity);
      paramCount++;
    }
    
    query += ` ORDER BY timestamp DESC`;
    
    if (limit) {
      query += ` LIMIT $${paramCount}`;
      params.push(limit);
    }
    
    const result = await pool.query(query, params.length > 0 ? params : undefined);
    res.json({ 
      data: result.rows
    });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Failed to fetch security events' });
  }
});

app.get('/api/security/severity-distribution', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
        severity,
        COUNT(*) as count
      FROM security_events 
      GROUP BY severity
      ORDER BY 
        CASE severity
          WHEN 'Critical' THEN 1
          WHEN 'High' THEN 2
          WHEN 'Medium' THEN 3
          WHEN 'Low' THEN 4
        END`
    );
    res.json({ 
      data: result.rows
    });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Failed to fetch severity distribution' });
  }
});

// Create a new security event
app.post('/api/security/events', async (req, res) => {
  try {
    // Validate request body with Zod (using safeParse - non-throwing)
    const validationResult = CreateSecurityEventSchema.safeParse(req.body);
    
    if (!validationResult.success) {
      return res.status(400).json({ 
        error: 'Validation failed',
        details: validationResult.error.format()
      });
    }
    
    const { 
      event_type, 
      severity, 
      status, 
      source_ip, 
      target_system, 
      description, 
      threat_score, 
      affected_users 
    } = validationResult.data;
    
    // Insert the new event
    const result = await pool.query(
      `INSERT INTO security_events 
        (event_type, severity, status, timestamp, source_ip, target_system, description, threat_score, affected_users) 
       VALUES ($1, $2, $3, NOW(), $4, $5, $6, $7, $8)
       RETURNING *`,
      [event_type, severity, status, source_ip, target_system, description, threat_score, affected_users]
    );
    
    res.status(201).json({ 
      success: true,
      message: 'Security event created successfully',
      data: result.rows[0]
    });
  } catch (err) {
    console.error('Error creating security event:', err);
    res.status(500).json({ 
      error: 'Failed to create security event',
      details: err.message 
    });
  }
});

// Migrate table to use SERIAL for event_id (one-time fix)
app.post('/api/security/migrate-table', async (req, res) => {
  try {
    console.log('🔧 Migrating security_events table to use SERIAL event_id...');
    
    // Drop and recreate the table with correct schema
    await pool.query('DROP TABLE IF EXISTS security_events CASCADE');
    
    await pool.query(`
      CREATE TABLE security_events (
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
      )
    `);
    
    // Insert sample data
    await pool.query(`
      INSERT INTO security_events (event_type, severity, status, timestamp, source_ip, target_system, description, threat_score, affected_users) VALUES
      ('Malware', 'Critical', 'Active', NOW() - INTERVAL '5 minutes', '185.220.101.45', 'web-server-prod-01', 'Trojan.Generic.KD detected in system32 directory. File quarantined but process may have executed.', 95, 0),
      ('Phishing', 'High', 'Investigating', NOW() - INTERVAL '15 minutes', '104.28.192.78', 'email-gateway-02', 'Spear phishing campaign targeting executive team. 15 malicious emails detected and blocked.', 78, 15),
      ('Intrusion', 'High', 'Investigating', NOW() - INTERVAL '22 minutes', '192.0.2.156', 'database-server-03', 'Unauthorized database access attempt. Multiple failed login attempts followed by SQL injection patterns.', 82, 0)
    `);
    
    const countResult = await pool.query('SELECT COUNT(*) as total FROM security_events');
    const total = parseInt(countResult.rows[0].total);
    
    console.log(`✅ Table migrated! Total events: ${total}`);
    
    res.json({ 
      success: true,
      message: 'Table migrated to use SERIAL event_id successfully!',
      total_events: total
    });
  } catch (err) {
    console.error('❌ Error migrating table:', err);
    res.status(500).json({ 
      success: false,
      error: 'Failed to migrate table',
      details: err.message 
    });
  }
});

// Refresh security events with new timestamps
app.post('/api/security/refresh-events', async (req, res) => {
  try {
    const validationResult = RefreshEventsSchema.safeParse(req.body);
    
    if (!validationResult.success) {
      return res.status(400).json({ 
        error: 'Invalid request body',
        details: validationResult.error.format()
      });
    }
    
    const { interval } = validationResult.data;
    
    console.log(`🔄 Refreshing security event timestamps with interval: ${interval} hours...`);
    
    // Delete existing events
    await pool.query('DELETE FROM security_events');
    
    await pool.query(`
      INSERT INTO security_events (event_type, severity, status, timestamp, source_ip, target_system, description, threat_score, affected_users) VALUES
      ('Malware', 'Critical', 'Active', NOW() - INTERVAL '${interval} hours', '185.220.101.45', 'web-server-prod-01', 'Trojan.Generic.KD detected in system32 directory. File quarantined but process may have executed.', 95, 0),
      ('Phishing', 'High', 'Investigating', NOW() - INTERVAL '${interval * 2} hours', '104.28.192.78', 'email-gateway-02', 'Spear phishing campaign targeting executive team. 15 malicious emails detected and blocked.', 78, 15),
      ('Intrusion', 'High', 'Investigating', NOW() - INTERVAL '${interval * 3} hours', '192.0.2.156', 'database-server-03', 'Unauthorized database access attempt. Multiple failed login attempts followed by SQL injection patterns.', 82, 0),
      ('DDoS', 'Medium', 'Resolved', NOW() - INTERVAL '${interval * 4} hours', '203.0.113.42', 'api-gateway-prod', 'Distributed denial of service attack detected. Traffic spike of 50k req/sec mitigated by rate limiting.', 65, 0),
      ('Suspicious Activity', 'Low', 'False Positive', NOW() - INTERVAL '${interval * 5} hours', '198.51.100.23', 'file-server-backup', 'Unusual file access pattern detected. Investigation revealed automated backup process.', 25, 0),
      ('Ransomware', 'Critical', 'Active', NOW() - INTERVAL '${interval / 2} hours', '45.33.21.156', 'file-server-prod-05', 'Ransomware encryption activity detected. Multiple file extensions being changed to .locked', 98, 250),
      ('Data Breach', 'Critical', 'Investigating', NOW() - INTERVAL '${interval} hours', '198.51.100.88', 'database-prod-01', 'Unauthorized data export detected. 50,000+ customer records accessed and downloaded.', 92, 50000),
      ('Malware', 'High', 'Active', NOW() - INTERVAL '${interval * 2} hours', '203.0.113.67', 'workstation-dev-23', 'Keylogger detected on developer workstation. Credential theft suspected.', 85, 1),
      ('Intrusion', 'Medium', 'Investigating', NOW() - INTERVAL '${interval * 4} hours', '192.0.2.201', 'vpn-gateway-02', 'Brute force attack on VPN credentials. 1000+ failed login attempts in 5 minutes.', 70, 0),
      ('Suspicious Activity', 'Low', 'Resolved', NOW() - INTERVAL '${interval * 6} hours', '104.28.192.99', 'api-prod-03', 'Unusual API access pattern from new geographic location. Verified as legitimate user.', 30, 0)
    `);
    
    // Get the count
    const countResult = await pool.query('SELECT COUNT(*) as total FROM security_events');
    const total = parseInt(countResult.rows[0].total);
    
    console.log(`✅ Security events refreshed! Total: ${total}`);
    
    res.json({ 
      success: true,
      message: 'Security events refreshed successfully!',
      total_events: total,
      interval_used: interval
    });
  } catch (err) {
    console.error('❌ Error refreshing security events:', err);
    res.status(500).json({ 
      success: false,
      error: 'Failed to refresh security events',
      details: err.message 
    });
  }
});

// Error handling
app.use((err, req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Initialize database and start server
async function startServer() {
  try {
    console.log('🚀 Starting Node.js service...');
    
    // Test database connection first
    await pool.query('SELECT NOW()');
    console.log('✅ Database connection established');
    
    // Try to initialize from SQL files (may not exist on Render)
    await initializeDatabase(pool);
    
    // Ensure basic table structure exists
    await ensureBasicTables(pool);
    
    // Start the server
    app.listen(PORT, () => {
      console.log(`✅ Node.js service running on port ${PORT}`);
      console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    console.error('⚠️  Starting server anyway - some features may not work');
    
    // Start server even if DB init fails
    app.listen(PORT, () => {
      console.log(`⚠️  Node.js service running on port ${PORT} (DB init failed)`);
    });
  }
}

startServer();

