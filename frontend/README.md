# React Frontend

A modern React.js frontend built with Vite, designed to communicate with both Node.js and Go backend services.

## Features

- React with Hooks
- Vite for fast development and optimized builds
- Modern, responsive UI design
- Real-time backend service health monitoring
- Interactive data fetching from multiple backend services
- **TanStack Table** for advanced data tables
- **Recharts** for interactive data visualization
- Sortable, filterable data tables
- Multiple chart types: Pie, Bar, and Line charts

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server with hot module replacement
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Backend Integration

The frontend connects to two backend services:
- **Node.js Service**: `http://localhost:3001`
- **Go Service**: `http://localhost:3002`

Make sure both backend services are running before starting the frontend.

## Features

### Service Health Monitoring
The app automatically checks the health status of both backend services on load and displays their status.

### Data Fetching
Interactive buttons allow you to fetch sample data from each backend service to demonstrate the integration.

### Interactive Data Table
- Powered by TanStack Table
- Column sorting (click headers)
- Responsive design
- Type badges with color coding
- Displays combined data from both backend services

### Data Visualization
- Multiple chart types using Recharts
- **Pie Chart**: Shows distribution of items by type
- **Bar Chart**: Visualizes item counts by category
- **Line Chart**: Displays growth trends over time
- Responsive and interactive charts
- Hover tooltips for detailed information

## Technology Stack

- React with Hooks
- Vite for fast development
- TanStack Table (@tanstack/react-table)
- Recharts for data visualization
- Tailwind CSS for styling
- ESLint for code quality
- Modern CSS with responsive design

## Component Structure

```
src/
├── App.jsx                    # Main application component
├── App.css                    # Global application styles
├── components/
│   └── HealthCheck/
│       ├── DataTable.jsx      # Interactive data table component
│       ├── DataTable.css      # Table styling
│       ├── DataCharts.jsx     # Data visualization component
│       └── DataCharts.css     # Chart styling
├── main.jsx                   # Application entry point
└── index.css                  # Base styles
```

## Using the Components

### DataTable Component

```jsx
import { DataTable } from './components/HealthCheck/DataTable'

const data = [
  { id: 1, name: 'Item 1', type: 'node' },
  { id: 2, name: 'Item 2', type: 'go' },
]

<DataTable data={data} />
```

Features:
- Automatic sorting on column headers
- Customizable columns
- Responsive design
- Type-based color coding

### DataCharts Component

```jsx
import { DataCharts } from './components/HealthCheck/DataCharts'

const data = [
  { id: 1, name: 'Item 1', type: 'node' },
  { id: 2, name: 'Item 2', type: 'go' },
]

<DataCharts data={data} />
```

Displays:
- Pie chart for type distribution
- Bar chart for item counts
- Line chart for trends

## Libraries Used

### TanStack Table (@tanstack/react-table)
- **Purpose**: Headless UI for building powerful tables
- **Features**: Sorting, filtering, pagination, custom columns
- **Documentation**: https://tanstack.com/table/latest
- **License**: MIT

### Recharts
- **Purpose**: Composable charting library for React
- **Features**: Multiple chart types, responsive, customizable
- **Documentation**: https://recharts.org/
- **License**: MIT

Both libraries are:
- ✅ Open source
- ✅ Actively maintained
- ✅ Well-documented
- ✅ Production-ready
- ✅ TypeScript support
- ✅ Large community

## Customization

### Adding New Columns to DataTable

Edit `src/components/HealthCheck/DataTable.jsx`:

```jsx
const columns = useMemo(
  () => [
    // Add your column here
    {
      accessorKey: 'newField',
      header: 'New Field',
      size: 150,
    },
  ],
  []
)
```

### Adding New Charts

Edit `src/components/HealthCheck/DataCharts.jsx` and add any Recharts component:

```jsx
import { AreaChart, Area } from 'recharts'

<AreaChart data={data}>
  <Area dataKey="value" fill="#8884d8" />
</AreaChart>
```

## Performance

- Components use React.memo and useMemo for optimization
- Recharts handles responsive sizing automatically
- TanStack Table is highly performant even with large datasets
- Lazy loading can be added for very large datasets

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive
- No IE11 support (uses modern JavaScript features)
