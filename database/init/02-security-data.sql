-- ============================================
-- Security Events Database Schema and Sample Data
-- ============================================
-- This file provides a starter schema for security event tracking
-- Candidates should expand on this schema as needed for their implementation
-- ============================================

-- Create ENUM types for standardized values
CREATE TYPE severity_level AS ENUM ('Critical', 'High', 'Medium', 'Low');
CREATE TYPE event_type AS ENUM ('Malware', 'Phishing', 'DDoS', 'Intrusion', 'Data Breach', 'Ransomware', 'Suspicious Activity');
CREATE TYPE event_status AS ENUM ('Active', 'Investigating', 'Resolved', 'False Positive');

-- ============================================
-- Main Security Events Table
-- ============================================
CREATE TABLE IF NOT EXISTS security_events (
    event_id SERIAL PRIMARY KEY,
    event_type event_type NOT NULL,
    severity severity_level NOT NULL,
    status event_status NOT NULL DEFAULT 'Active',
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    source_ip VARCHAR(45),  -- Supports IPv4 and IPv6
    target_system VARCHAR(255) NOT NULL,
    description TEXT,
    threat_score INTEGER CHECK (threat_score >= 0 AND threat_score <= 100),
    affected_users INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- Threat Intelligence Table (Optional)
-- ============================================
CREATE TABLE IF NOT EXISTS threat_intelligence (
    threat_id SERIAL PRIMARY KEY,
    threat_name VARCHAR(255) NOT NULL,
    threat_category event_type NOT NULL,
    risk_level severity_level NOT NULL,
    description TEXT,
    indicators_of_compromise TEXT,  -- Could be JSON in a real implementation
    first_seen TIMESTAMP NOT NULL,
    last_seen TIMESTAMP NOT NULL,
    occurrences INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- Sample Data - Security Events (5 records)
-- ============================================
-- These records demonstrate variety in severity, types, and statuses
-- Candidates should add more records to create richer visualizations

INSERT INTO security_events (event_type, severity, status, timestamp, source_ip, target_system, description, threat_score, affected_users) VALUES
('Ransomware', 'Critical', 'Active', NOW() - INTERVAL '2 minutes', '45.33.21.156', 'file-server-prod-05', 'Ransomware encryption activity detected. Multiple file extensions being changed to .locked', 98, 250),

('Malware', 'Critical', 'Active', NOW() - INTERVAL '5 minutes', '185.220.101.45', 'web-server-prod-01', 'Trojan.Generic.KD detected in system32 directory. File quarantined but process may have executed.', 95, 0),

('Data Breach', 'Critical', 'Investigating', NOW() - INTERVAL '8 minutes', '198.51.100.88', 'database-prod-01', 'Unauthorized data export detected. 50,000+ customer records accessed and downloaded.', 92, 50000),

('Malware', 'High', 'Active', NOW() - INTERVAL '12 minutes', '203.0.113.67', 'workstation-dev-23', 'Keylogger detected on developer workstation. Credential theft suspected.', 85, 1),

('Phishing', 'High', 'Investigating', NOW() - INTERVAL '15 minutes', '104.28.192.78', 'email-gateway-02', 'Spear phishing campaign targeting executive team. 15 malicious emails detected and blocked.', 78, 15),

('Intrusion', 'High', 'Investigating', NOW() - INTERVAL '22 minutes', '192.0.2.156', 'database-server-03', 'Unauthorized database access attempt. Multiple failed login attempts followed by SQL injection patterns.', 82, 0),

('Intrusion', 'Medium', 'Investigating', NOW() - INTERVAL '28 minutes', '192.0.2.201', 'vpn-gateway-02', 'Brute force attack on VPN credentials. 1000+ failed login attempts in 5 minutes.', 70, 0),

('Suspicious Activity', 'Low', 'Resolved', NOW() - INTERVAL '35 minutes', '104.28.192.99', 'api-prod-03', 'Unusual API access pattern from new geographic location. Verified as legitimate user.', 30, 0),

('DDoS', 'Medium', 'Resolved', NOW() - INTERVAL '45 minutes', '203.0.113.42', 'api-gateway-prod', 'Distributed denial of service attack detected. Traffic spike of 50k req/sec mitigated by rate limiting.', 65, 0),

('Suspicious Activity', 'Low', 'False Positive', NOW() - INTERVAL '1 hour', '198.51.100.23', 'file-server-backup', 'Unusual file access pattern detected. Investigation revealed automated backup process.', 25, 0);

-- ============================================
-- Sample Data - Threat Intelligence (5 records)
-- ============================================

INSERT INTO threat_intelligence (threat_name, threat_category, risk_level, description, indicators_of_compromise, first_seen, last_seen, occurrences) VALUES
('Emotet Banking Trojan', 'Malware', 'Critical', 'Banking trojan that steals credentials and delivers additional malware payloads. Known for spreading via malicious email attachments.', 'MD5: 4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a, C2: malicious-domain[.]ru', NOW() - INTERVAL '30 days', NOW() - INTERVAL '30 minutes', 247),

('Office365 Credential Harvesting', 'Phishing', 'High', 'Phishing campaign impersonating Microsoft Office365 login pages to steal corporate credentials.', 'URL: fake-office-login[.]com, IP: 185.220.101.0/24', NOW() - INTERVAL '15 days', NOW() - INTERVAL '2 hours', 128),

('Mirai Botnet DDoS', 'DDoS', 'Medium', 'IoT botnet conducting volumetric DDoS attacks against web infrastructure.', 'Botnet IPs: 203.0.113.0/24, User-Agent: Mozilla/5.0 (X11; Linux)', NOW() - INTERVAL '10 days', NOW() - INTERVAL '5 hours', 89),

('APT41 Reconnaissance', 'Intrusion', 'Critical', 'Advanced persistent threat group conducting network reconnaissance and data exfiltration attempts.', 'Techniques: Port scanning, SQL injection, Lateral movement tools', NOW() - INTERVAL '60 days', NOW() - INTERVAL '1 hour', 34),

('Cryptomining Software', 'Suspicious Activity', 'Medium', 'Unauthorized cryptocurrency mining software detected on workstations, consuming CPU resources.', 'Process: xmrig.exe, Network: pool.minexmr[.]com:4444', NOW() - INTERVAL '7 days', NOW() - INTERVAL '3 hours', 156);

-- ============================================
-- Create Indexes for Performance
-- ============================================
-- These indexes will help with common query patterns

CREATE INDEX idx_security_events_timestamp ON security_events(timestamp DESC);
CREATE INDEX idx_security_events_severity ON security_events(severity);
CREATE INDEX idx_security_events_status ON security_events(status);
CREATE INDEX idx_security_events_type ON security_events(event_type);
CREATE INDEX idx_threat_intelligence_category ON threat_intelligence(threat_category);
CREATE INDEX idx_threat_intelligence_risk ON threat_intelligence(risk_level);

-- ============================================
-- Helpful Views (Optional)
-- ============================================
-- Candidates may find these views useful for their implementation

-- View: Active high-priority events
CREATE VIEW active_critical_events AS
SELECT event_id, event_type, severity, timestamp, target_system, description, threat_score
FROM security_events
WHERE status = 'Active' AND (severity = 'Critical' OR severity = 'High')
ORDER BY timestamp DESC;

-- View: Event summary by type and severity
CREATE VIEW event_summary AS
SELECT 
    event_type,
    severity,
    status,
    COUNT(*) as event_count,
    AVG(threat_score) as avg_threat_score,
    MAX(timestamp) as latest_event
FROM security_events
GROUP BY event_type, severity, status
ORDER BY event_count DESC;

-- ============================================
-- Notes for Candidates
-- ============================================
-- 
-- This is a STARTER schema with minimal sample data (5 records per table).
-- You should:
-- 
-- 1. Expand this schema as needed for your implementation
-- 2. Add more sample data to create richer visualizations
-- 3. Consider adding additional tables (e.g., affected_systems, event_logs, etc.)
-- 4. Modify field types or add fields to support your features
-- 5. Add foreign key relationships if you create related tables
-- 6. Consider adding triggers for updated_at timestamps
-- 
-- Feel free to be creative with your database design!
-- ============================================

