# RADICL - Coding Exercise

## 🎯 START HERE: [CANDIDATE_README.md](CANDIDATE_README.md)

**For candidates:**
1. Read **[CANDIDATE_README.md](CANDIDATE_README.md)** for exercise instructions and requirements
2. Then read this file for technical documentation, setup instructions, and troubleshooting

Both files contain essential information for completing the exercise.
---

## About This Exercise

This is a take-home coding exercise for our QA position. You'll be working on a cybersecurity operations dashboard using this existing full-stack application as your foundation.

**What's already here:**
- Working React frontend (with example components)
- Node.js and Go backend services (with example endpoints)
- PostgreSQL database (ready for your schema)
- Example data visualizations and tables (not related to security)

This exercise tests your ability to adapt existing code and build new things - a realistic representation of our daily work.

## ⚠️ IMPORTANT: Keep This Documentation Updated

**If you modify anything about the setup process, YOU MUST update this README immediately:**

- ✅ Added new SQL scripts? Document them in the database section
- ✅ Installed new npm packages or Go modules? Update the prerequisites and setup steps
- ✅ Changed environment variables? Update the configuration section
- ✅ Added new services or changed ports? Update the architecture and quick start sections
- ✅ Modified database schema? Document the changes
- ✅ Changed build commands? Update the development and production build sections

**We will be running your application locally.** Outdated or incorrect setup instructions will significantly impact your evaluation. Test your instructions by cloning your repo in a fresh directory and following them exactly.

## Architecture

```
qa-coding-exercise/
├── frontend/              # React.js + Vite frontend
├── backend/
│   ├── node-service/      # Node.js + Express backend
│   └── go-service/        # Go + Gorilla Mux backend
├── database/              # PostgreSQL initialization scripts
├── docker-compose.yml     # Docker Compose configuration
└── README.md
```

## Technology Stack

### Frontend
- **React** - Modern UI library with hooks
- **Vite** - Lightning-fast build tool and dev server
- **React Router** - Declarative routing for React
- **Zustand** - Lightweight state management
- **Material-UI (MUI)** - React component library with Material Design
- **TanStack Table** - Powerful headless table library
- **Recharts** - Composable charting library for data visualization
- **Tailwind CSS** - Utility-first CSS framework
- **ESLint** - Code quality and linting

### Backend Services

#### Node.js Service
- **Express** - Fast, minimalist web framework
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment configuration
- **Nodemon** - Development auto-reload
- **Zod** - TypeScript-first schema validation library

#### Go Service
- **Gorilla Mux** - Powerful HTTP router
- **rs/cors** - CORS middleware
- **net/http** - Standard HTTP server

### Database
- **PostgreSQL** - Robust relational database
- **Docker Compose** - Containerized database setup
- **Automatic initialization** - SQL scripts for schema and seed data

## Quick Start

### Prerequisites
- **Node.js 20.19+ or 22.12+** and npm
- Go 1.21+
- Docker and Docker Compose (for database)
- Git
- Terminal access

**Install/Upgrade Node.js with nvm:**
```bash
# Install nvm (if not already installed)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

# Install Node.js 20.19 or later
nvm install 20.19
nvm use 20.19

# Verify version
node --version  # Should show v20.19.x or higher
```

### 0. Clone the Repository

```bash
# Clone the repository
git clone git@github.com:RADICLDefense/qa-coding-exercise.git

# Navigate into the project directory
cd qa-coding-exercise
```

**Note:** If you don't have SSH keys set up with GitHub, use HTTPS instead:
```bash
git clone https://github.com/RADICLDefense/qa-coding-exercise.git
```

### 1. Quick Start with Automated Script (Optional)

We provide automated startup scripts for quick setup:

**macOS/Linux:**
```bash
./start.sh
```

**Windows:**
```bash
start.bat
```

The script will:
- ✅ Verify all prerequisites (Node.js, Go, Docker)
- ✅ Start PostgreSQL database
- ✅ Install all dependencies
- ✅ Initialize database schema if needed
- ✅ Start all three services simultaneously

**Note:** While the automated scripts can help you get started quickly, **we recommend following the manual setup steps below** to better understand the application architecture, troubleshoot issues, and gain deeper insight into how each service works.

---

### 2. Manual Setup

#### 2.1. Start the PostgreSQL Database

```bash
docker compose up -d
```

The database will run on `localhost:5432`. See [database/README.md](database/README.md) for detailed configuration.

#### 2.2. Start the Node.js Backend

```bash
cd backend/node-service
npm install
npm run dev
```

The Node.js service will run on `http://localhost:3001`

#### 2.3. Start the Go Backend

```bash
cd backend/go-service
go mod tidy
go run main.go
```

The Go service will run on `http://localhost:3002`

#### 2.4. Start the React Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173`

## Application Routes

The frontend uses React Router for navigation:

| Route | Page | Description |
|-------|------|-------------|
| `/` | Dashboard | Main cybersecurity operations dashboard with all security visualizations |
| `/health` | HealthCheck | Service monitoring page with data fetching capabilities |
| `/service-health` | ServiceHealth | Detailed service health status and diagnostics |

## API Endpoints

### Node.js Service (Port 3001)

#### General Endpoints
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check endpoint |
| `/api/node/hello` | GET | Hello world message |
| `/api/node/data` | GET | Sample data array from database |

#### Security Endpoints
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/security/events` | GET | Fetch all security events from database (with query validation) |
| `/api/security/events` | POST | Create a new security event (with Zod validation) |
| `/api/security/severity-distribution` | GET | Get count of events grouped by severity level |
| `/api/security/refresh-events` | POST | Refresh security events with new timestamps (with Zod validation) |
| `/api/security/migrate-table` | POST | Migrate security_events table schema (admin use) |

### Go Service (Port 3002)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check endpoint |
| `/api/go/hello` | GET | Hello world message |
| `/api/go/data` | GET | Sample data array from database |

## Development

### Frontend Development
```bash
cd frontend
npm run dev    # Start dev server
npm run build  # Build for production
npm run lint   # Run linter
```

### Node.js Backend Development
```bash
cd backend/node-service
npm run dev    # Start with hot reload
npm start      # Start production mode
```

### Go Backend Development
```bash
cd backend/go-service
go run main.go        # Run in development
go build -o service   # Build binary
./service             # Run binary
```

### Database Development
```bash
docker compose up -d           # Start database
docker compose stop            # Stop database
docker compose down -v         # Remove database and data
docker compose logs postgres   # View database logs

# Connect to database
docker compose exec postgres psql -U radicl_user -d radicl_db

# Run SQL file
docker compose exec -T postgres psql -U radicl_user -d radicl_db < your-script.sql
```

See [database/README.md](database/README.md) for complete documentation.

## Project Structure

### Frontend
```
frontend/
├── src/
│   ├── main.jsx                    # Application entry point
│   ├── App.jsx                     # Main app component with routing
│   ├── App.css                     # Application styles
│   ├── index.css                   # Global styles (Tailwind)
│   ├── pages/                      # Page components
│   │   ├── Dashboard.jsx           # Main security dashboard page
│   │   ├── HealthCheck.jsx         # Service health monitoring page
│   │   └── ServiceHealth.jsx       # Detailed service diagnostics
│   ├── components/
│   │   ├── Dashboard/              # Dashboard-specific components
│   │   │   ├── DashboardLayout.jsx           # Dashboard layout wrapper
│   │   │   ├── DashboardHeader.jsx           # Dashboard header with title
│   │   │   ├── Sidebar.jsx                   # Navigation sidebar
│   │   │   ├── MetricCards.jsx               # KPI metric cards
│   │   │   ├── ActiveSecurityIncidents.jsx   # Active incident cards
│   │   │   ├── EventSeverityTagCloud.jsx     # Severity distribution tags
│   │   │   ├── SecurityEventsTable.jsx       # Real-time events table
│   │   │   ├── TopThreatTypes.jsx            # Threat types bar chart
│   │   │   ├── GeographicThreatMap.jsx       # World threat map
│   │   │   ├── ServiceHealthStatus.jsx       # Service health indicators
│   │   │   └── HealthCheckLink.jsx           # Quick health check link
│   │   └── HealthCheck/            # Health check page components
│   │       ├── Header.jsx                    # Page header
│   │       ├── ServiceStatus.jsx             # Service status indicators
│   │       ├── GettingStarted.jsx            # Quick start instructions
│   │       ├── FetchedDataView.jsx           # Data display wrapper
│   │       ├── DataVisualization.jsx         # Charts component
│   │       ├── DataCharts.jsx                # Recharts visualizations
│   │       ├── DataTable.jsx                 # TanStack Table component
│   │       ├── DataCharts.css                # Chart styles
│   │       └── DataTable.css                 # Table styles
│   └── store/
│       └── useAppStore.js          # Zustand state management store
├── public/
│   └── vite.svg                    # Vite logo
├── package.json                    # Frontend dependencies
├── vite.config.js                  # Vite configuration
├── tailwind.config.js              # Tailwind CSS configuration
├── postcss.config.js               # PostCSS configuration
└── eslint.config.js                # ESLint configuration
```

### State Management
The application uses **Zustand** for global state management:
- `useAppStore.js`: Centralized store handling:
  - Service health status
  - Security events data
  - Severity distribution
  - API data fetching
  - Loading states

### Component Architecture

The application follows a modular component structure:

1. **Pages** (`src/pages/`)
   - Top-level route components
   - Compose multiple components into full page views
   - Handle page-specific logic and data fetching

2. **Dashboard Components** (`src/components/Dashboard/`)
   - Reusable dashboard widgets
   - Each component is self-contained with its own styling
   - Support loading states with Material-UI Skeleton loaders
   - Organized by feature (metrics, incidents, maps, tables, etc.)

3. **Layout Components**
   - `DashboardLayout.jsx` - Main layout wrapper with sidebar navigation
   - `DashboardHeader.jsx` - Top header with branding
   - `Sidebar.jsx` - Navigation sidebar with route links

4. **Design Principles**
   - Dark theme optimized for Security Operations Center (SOC) environments
   - Responsive grid layouts using Tailwind CSS
   - Consistent color coding for severity levels (Critical=red, High=orange, Medium=yellow, Low=blue)
   - Smooth animations and transitions for better UX
   - Accessibility considerations (proper ARIA labels, keyboard navigation)

### Node.js Backend
```
backend/node-service/
├── src/
│   ├── index.js       # Express server with API routes
│   ├── init-db.js     # Database initialization functions
│   └── run-db-init.js # Database initialization runner
├── package.json       # Node.js dependencies
└── .env               # Environment variables (included)
```

### Go Backend
```
backend/go-service/
├── main.go            # HTTP server with Gorilla Mux
├── go.mod             # Go module definition
├── go.sum             # Go dependencies
└── .env               # Environment variables (included)
```

### Database
```
database/
├── init/
│   ├── 01-init.sql                    # Initial schema and tables
│   ├── 02-security-data.sql           # Security events seed data
│   └── 03-additional-security-data.sql # Additional security data
├── refresh-security-events.sql        # Script to refresh event timestamps
└── README.md                          # Database documentation
```

### Database Schema

The application uses PostgreSQL with the following main tables:

#### Core Tables
- **`users`** - Sample user accounts
  - UUID primary key
  - Username, email (unique)
  - Timestamps

- **`items`** - Sample data items for testing
  - Serial ID
  - Name, description, type
  - Foreign key to users

#### Security Tables
- **`security_events`** - Main security event tracking
  - `event_id` (SERIAL PRIMARY KEY)
  - `event_type` (ENUM: Malware, Phishing, DDoS, Intrusion, Data Breach, Ransomware, Suspicious Activity)
  - `severity` (ENUM: Critical, High, Medium, Low)
  - `status` (ENUM: Active, Investigating, Resolved, False Positive)
  - `timestamp`, `source_ip`, `target_system`, `description`
  - `threat_score` (0-100), `affected_users`
  - Indexed on: timestamp, severity, status, event_type

- **`threat_intelligence`** - Threat tracking and patterns
  - Threat name, category, risk level
  - Indicators of compromise
  - Occurrence tracking

#### Database Views
- **`active_critical_events`** - Active high-priority events
- **`event_summary`** - Event counts by type, severity, and status


### Features Implemented

**Cybersecurity Dashboard Features:**

**Component 1: Metric Cards (MetricCards.jsx)**
- 4 Security KPI Metric Cards displaying:
  - Total Security Events (dynamically calculated from database)
  - Critical/High Events (dynamically calculated with percentage of total)
  - Active Incidents (2 incidents with RESPONDING status)
  - Mean Response Time (8 minutes, down 15%)
  - Each with gradient icons, trend indicators, and security-themed colors

**Component 2: Active Security Incidents (ActiveSecurityIncidents.jsx)**
- Detailed incident cards showing real-time security incidents:
  - **Ransomware Attack - Finance Dept**: CRITICAL severity, 12 affected systems, 75% response progress, detected 2 hours ago, status: Containing
  - **DDoS Attack - Web Infrastructure**: HIGH severity, 5 affected systems, 60% mitigation progress, detected 45 minutes ago, status: Mitigating
  - Each incident displays: severity badge, affected systems count, response progress bar, and status details

**Component 3: Event Severity Tag Cloud (EventSeverityTagCloud.jsx)**
- Interactive tag cloud visualization for event severity distribution
- Displays: Critical, High, Medium, Low events with color-coded tags
- Shows event counts and percentages for each severity level
- Connected to database via store to fetch real severity distribution data
- Hover effects with scaling and glow animations

**Component 4: Real-time Security Events Table (SecurityEventsTable.jsx)**
- Comprehensive data table showing latest security events from database
- Columns: Event Type, Severity, Status, Target System, Source IP, Threat Score, Time
- Features: sortable, scrollable (max 10 visible rows), auto-refresh capability
- Color-coded severity badges (Critical=red, High=orange, Medium=yellow, Low=blue)
- Status indicators (Active, Investigating, Resolved, False Positive)
- Relative timestamp formatting (e.g., "2 hours ago", "Just now")
- Connected to PostgreSQL database via store

**Component 5: Top Threat Types (TopThreatTypes.jsx)**
- Horizontal bar chart showing distribution of threat categories:
  - Malware Infections (342 events)
  - Phishing Attempts (287 events)
  - Intrusion Attempts (234 events)
  - DDoS Attacks (156 events)
  - Data Exfiltration (139 events)
  - Ransomware (89 events)
- Color-coded bars for visual differentiation
- Shows exact event counts for each threat type

**Component 6: Geographic Threat Map (GeographicThreatMap.jsx)**
- World map visualization with coordinate grid system (latitude/longitude lines)
- Animated threat markers by region and severity:
  - Asia-Pacific: High threat (red pulsing marker) - 487 threats
  - Eastern Europe: Medium threat (orange marker) - 234 threats
  - North America, South America, Africa: Low threats (blue/purple markers)
- Key metrics displayed:
  - Threat Origins: 47 countries
  - Blocked IPs: 2,341 in last 24h
  - Active Attacks: 156 in progress
- Real-time alert system showing coordinated DDoS attacks from APAC region
- Firewall rules counter (1,847 active rules)
- Detection accuracy: 99.7%

**Additional Features:**
- Health Check page at `/health` route with service status monitoring and data visualization
- Fully responsive design with mobile, tablet, and desktop breakpoints
- Smooth transitions, hover effects, pulsing animations, and gradient buttons throughout
- MUI Skeleton loaders for all components with proper loading states
- Dark theme optimized for Security Operations Center (SOC) environments

## Environment Configuration

Environment variables are pre-configured in `.env` files included with the project for each service.

### Node.js Service
The `backend/node-service/.env` file contains:
```env
PORT=3001
DATABASE_URL=postgresql://radicl_user:radicl_password@localhost:5432/radicl_db
```

### Go Service
The `backend/go-service/.env` file contains:
```env
PORT=3002
DB_HOST=localhost
DB_PORT=5432
DB_NAME=radicl_db
DB_USER=radicl_user
DB_PASSWORD=radicl_password
DB_SSLMODE=disable
```

## Testing the Setup

1. **Open the Dashboard**
   - Navigate to `http://localhost:5173`
   - You should see the **Security Analytics Dashboard** with all components loaded

2. **Verify Dashboard Components**
   The main dashboard (`/`) displays:
   - **Metric Cards** - 4 KPI cards showing security statistics
   - **Active Security Incidents** - 2 detailed incident cards with progress bars
   - **Event Severity Tag Cloud** - Interactive severity distribution
   - **Security Events Table** - Real-time events from database (sortable)
   - **Top Threat Types** - Horizontal bar chart with threat categories
   - **Geographic Threat Map** - World map with regional threat indicators

3. **Test API Integration**
   - Visit `/health` to see the Health Check page
   - Click "Fetch Node Data" and "Fetch Go Data" buttons
   - Verify the service status indicators show "healthy"
   - Once data is fetched, you'll see:
     - **Simple data view** with badges
     - **Interactive charts** (pie, bar, and line charts)
     - **Sortable data table** (click column headers to sort)

4. **Verify Database Connection**
   - The Security Events Table should auto-load data from PostgreSQL
   - Check browser console for any connection errors
   - If you see "Failed to fetch data", verify `.env` files exist in both backend services

5. **Test Navigation**
   - Click through all routes: `/`, `/health`, `/service-health`
   - Verify the sidebar navigation works correctly
   - Check that all components load without errors

## Production Build

### Frontend
```bash
cd frontend
npm run build
# Output will be in frontend/dist/
```

### Node.js Backend
```bash
cd backend/node-service
npm start
```

### Go Backend
```bash
cd backend/go-service
go build -o go-service
./go-service
```

## Troubleshooting

Common issues and quick solutions:

### Database Connection Errors

**Symptom:** Backend services fail with "Failed to fetch data from database" or cannot connect to PostgreSQL

**Solution:**
```bash
# Restart the Node.js service
cd backend/node-service
npm run dev

# In a new terminal, restart the Go service
cd backend/go-service
go run main.go
```

**Common causes:**
- Database not running (`docker compose up -d`)
- Incorrect credentials in `.env` file
- Database not initialized

### Node.js Version Issues

**Symptom:** Frontend fails to start with error: `crypto.hash is not a function` or `Vite requires Node.js version 20.19+ or 22.12+`

**Solution:**
```bash
# Check your current Node.js version
node --version

# If below 20.19, upgrade using nvm:
nvm install 20.19
nvm use 20.19

# Restart the frontend
cd frontend
npm run dev
```

### Port Already in Use
```bash
# Kill process on specific port
lsof -ti:5173 | xargs kill -9  # Frontend
lsof -ti:3001 | xargs kill -9  # Node.js
lsof -ti:3002 | xargs kill -9  # Go
lsof -ti:5432 | xargs kill -9  # PostgreSQL
```

### Dependencies Issues
```bash
# Clean and reinstall all dependencies
rm -rf node_modules package-lock.json
rm -rf frontend/node_modules frontend/package-lock.json
rm -rf backend/node-service/node_modules backend/node-service/package-lock.json

npm install
cd frontend && npm install && cd ..
cd backend/node-service && npm install && cd ../..
```

### Database Issues
```bash
# Reset database completely
docker compose down -v
docker compose up -d
```

## License

ISC

## Contributing

Feel free to submit issues and enhancement requests!
