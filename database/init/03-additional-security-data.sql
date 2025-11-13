-- ============================================
-- Additional Security Events Data
-- ============================================
-- Adding more records to create variety in severity distribution
-- This gives us more interesting tag cloud visualizations

INSERT INTO security_events (event_type, severity, status, timestamp, source_ip, target_system, description, threat_score, affected_users) VALUES

-- Additional Critical Events (3 more)
('Ransomware', 'Critical', 'Active', NOW() - INTERVAL '18 minutes', '45.142.120.45', 'file-server-prod-02', 'WannaCry ransomware variant detected. Files being encrypted. Immediate action required.', 98, 25),
('Data Breach', 'Critical', 'Investigating', NOW() - INTERVAL '32 minutes', '185.220.102.89', 'database-server-01', 'Unauthorized data exfiltration detected. Approximately 50GB of customer data accessed.', 92, 1500),
('Intrusion', 'Critical', 'Active', NOW() - INTERVAL '38 minutes', '103.85.24.156', 'admin-portal', 'Successful privilege escalation. Attacker has root access to admin systems.', 97, 5),

-- Additional High Events (5 more)
('Malware', 'High', 'Investigating', NOW() - INTERVAL '52 minutes', '198.54.117.200', 'workstation-dev-15', 'Trojan dropper detected. Attempting to download additional payloads.', 85, 1),
('Phishing', 'High', 'Active', NOW() - INTERVAL '48 minutes', '172.98.45.123', 'email-gateway-01', 'Sophisticated phishing campaign mimicking internal IT support. 28 employees targeted.', 79, 28),
('DDoS', 'High', 'Investigating', NOW() - INTERVAL '58 minutes', '45.33.32.156', 'api-gateway-prod', 'Large-scale DDoS attack. 200k requests/sec overwhelming load balancers.', 81, 0),
('Intrusion', 'High', 'Active', NOW() - INTERVAL '42 minutes', '89.248.172.16', 'vpn-gateway-02', 'Brute force attack on VPN credentials. 5000+ login attempts from multiple IPs.', 77, 0),
('Suspicious Activity', 'High', 'Investigating', NOW() - INTERVAL '55 minutes', '217.182.143.207', 'cloud-storage-bucket', 'Anomalous data access patterns. External IP accessing sensitive documents at unusual hours.', 73, 0),

-- Additional Medium Events (4 more)
('Phishing', 'Medium', 'Resolved', NOW() - INTERVAL '1 hour 15 minutes', '185.220.101.201', 'email-gateway-03', 'Generic phishing emails detected and quarantined. Low sophistication, no clicks recorded.', 55, 0),
('Suspicious Activity', 'Medium', 'Investigating', NOW() - INTERVAL '1 hour 22 minutes', '192.0.2.88', 'web-app-staging', 'Unusual API usage patterns detected. Potential reconnaissance activity.', 62, 0),
('Malware', 'Medium', 'Resolved', NOW() - INTERVAL '1 hour 35 minutes', '203.0.113.78', 'laptop-sales-08', 'Adware detected on sales team laptop. Successfully removed, no data compromise.', 58, 1),
('DDoS', 'Medium', 'Resolved', NOW() - INTERVAL '1 hour 48 minutes', '198.51.100.156', 'cdn-edge-node-04', 'Moderate traffic spike detected. Mitigated by CDN auto-scaling.', 60, 0),

-- Additional Low Events (3 more)
('Suspicious Activity', 'Low', 'False Positive', NOW() - INTERVAL '2 hours 5 minutes', '10.0.5.42', 'internal-scanner-01', 'Vulnerability scanner flagged as suspicious. Confirmed as scheduled security audit.', 20, 0),
('Phishing', 'Low', 'Resolved', NOW() - INTERVAL '2 hours 18 minutes', '104.28.193.100', 'email-gateway-02', 'Generic spam emails with suspicious links. All filtered successfully, no user interaction.', 30, 0),
('Suspicious Activity', 'Low', 'False Positive', NOW() - INTERVAL '2 hours 35 minutes', '10.0.8.15', 'backup-system-02', 'Unusual file transfer patterns. Confirmed as scheduled incremental backup process.', 22, 0);

-- ============================================
-- Summary of Additional Data:
-- ============================================
-- Critical: 3 additional (Total: 4)
-- High: 5 additional (Total: 7)
-- Medium: 4 additional (Total: 5)
-- Low: 3 additional (Total: 4)
-- 
-- Grand Total: 20 security events
-- This provides good variety for tag cloud visualization
-- ============================================

