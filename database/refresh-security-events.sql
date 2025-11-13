-- ============================================
-- Refresh Security Events with Current Timestamps
-- ============================================
-- Run this script to update security event timestamps
-- to be relative to the current time
-- Usage: Run from your postgres container or psql client
-- ============================================

-- Delete existing sample events
DELETE FROM security_events;

-- Re-insert with fresh timestamps
INSERT INTO security_events (event_type, severity, status, timestamp, source_ip, target_system, description, threat_score, affected_users) VALUES
('Malware', 'Critical', 'Active', NOW() - INTERVAL '5 minutes', '185.220.101.45', 'web-server-prod-01', 'Trojan.Generic.KD detected in system32 directory. File quarantined but process may have executed.', 95, 0),

('Phishing', 'High', 'Investigating', NOW() - INTERVAL '15 minutes', '104.28.192.78', 'email-gateway-02', 'Spear phishing campaign targeting executive team. 15 malicious emails detected and blocked.', 78, 15),

('Intrusion', 'High', 'Investigating', NOW() - INTERVAL '22 minutes', '192.0.2.156', 'database-server-03', 'Unauthorized database access attempt. Multiple failed login attempts followed by SQL injection patterns.', 82, 0),

('DDoS', 'Medium', 'Resolved', NOW() - INTERVAL '45 minutes', '203.0.113.42', 'api-gateway-prod', 'Distributed denial of service attack detected. Traffic spike of 50k req/sec mitigated by rate limiting.', 65, 0),

('Suspicious Activity', 'Low', 'False Positive', NOW() - INTERVAL '1 hour', '198.51.100.23', 'file-server-backup', 'Unusual file access pattern detected. Investigation revealed automated backup process.', 25, 0),

('Ransomware', 'Critical', 'Active', NOW() - INTERVAL '2 minutes', '45.33.21.156', 'file-server-prod-05', 'Ransomware encryption activity detected. Multiple file extensions being changed to .locked', 98, 250),

('Data Breach', 'Critical', 'Investigating', NOW() - INTERVAL '8 minutes', '198.51.100.88', 'database-prod-01', 'Unauthorized data export detected. 50,000+ customer records accessed and downloaded.', 92, 50000),

('Malware', 'High', 'Active', NOW() - INTERVAL '12 minutes', '203.0.113.67', 'workstation-dev-23', 'Keylogger detected on developer workstation. Credential theft suspected.', 85, 1),

('Intrusion', 'Medium', 'Investigating', NOW() - INTERVAL '28 minutes', '192.0.2.201', 'vpn-gateway-02', 'Brute force attack on VPN credentials. 1000+ failed login attempts in 5 minutes.', 70, 0),

('Suspicious Activity', 'Low', 'Resolved', NOW() - INTERVAL '35 minutes', '104.28.192.99', 'api-prod-03', 'Unusual API access pattern from new geographic location. Verified as legitimate user.', 30, 0);

SELECT 'Security events refreshed successfully!' as message;
SELECT COUNT(*) as total_events FROM security_events;

