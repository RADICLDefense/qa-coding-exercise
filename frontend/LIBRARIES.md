# Open Source Libraries Guide

This document provides detailed information about the open-source libraries used in this React frontend.

## Table of Contents
- [TanStack Table (React Table)](#tanstack-table)
- [Recharts](#recharts)
- [Quick Examples](#quick-examples)
- [Additional Resources](#additional-resources)

---

## TanStack Table

### Overview
TanStack Table (formerly React Table) is a headless UI library for building powerful tables and datagrids.

### Key Information
- **Package**: `@tanstack/react-table`
- **Version**: 8.x
- **License**: MIT
- **GitHub**: https://github.com/TanStack/table
- **Documentation**: https://tanstack.com/table/v8
- **Bundle Size**: ~15KB (minified + gzipped)

### Why We Chose It
- ✅ **Headless**: Complete control over UI/styling
- ✅ **Framework Agnostic**: Works with React, Vue, Solid, etc.
- ✅ **Powerful**: Sorting, filtering, pagination, grouping, etc.
- ✅ **TypeScript**: First-class TypeScript support
- ✅ **Performance**: Handles large datasets efficiently
- ✅ **Active Development**: Regular updates and maintenance

### Features Used in This Project
- Column sorting
- Custom cell rendering
- Flexible column configuration
- Responsive design

### Basic Usage

```jsx
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table'

const columns = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
]

const table = useReactTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
})
```

### Advanced Features Available
- **Filtering**: Global and column-specific filtering
- **Pagination**: Built-in pagination support
- **Row Selection**: Single and multi-row selection
- **Column Resizing**: Adjustable column widths
- **Column Ordering**: Drag and drop column reordering
- **Grouping**: Group rows by column values
- **Virtualization**: Render only visible rows for performance
- **Sub-Rows**: Expandable nested data

### Learning Resources
- [Official Docs](https://tanstack.com/table/v8/docs/guide/introduction)
- [Examples](https://tanstack.com/table/v8/docs/examples/react/basic)
- [Migration Guide (v7 to v8)](https://tanstack.com/table/v8/docs/guide/migrating)

---

## Recharts

### Overview
Recharts is a composable charting library built on React components, using D3 for calculations.

### Key Information
- **Package**: `recharts`
- **Version**: 2.x
- **License**: MIT
- **GitHub**: https://github.com/recharts/recharts
- **Documentation**: https://recharts.org/
- **Bundle Size**: ~93KB (minified + gzipped)

### Why We Chose It
- ✅ **React Native**: Built specifically for React
- ✅ **Declarative**: Use JSX to compose charts
- ✅ **Responsive**: Automatically adapts to container size
- ✅ **Customizable**: Full control over appearance
- ✅ **Rich Features**: Many chart types and features
- ✅ **D3-Powered**: Leverages D3 for calculations

### Chart Types Used in This Project
1. **Pie Chart**: Shows type distribution
2. **Bar Chart**: Displays item counts
3. **Line Chart**: Visualizes trends over time

### All Available Chart Types
- LineChart
- AreaChart
- BarChart
- PieChart
- RadarChart
- RadialBarChart
- ScatterChart
- ComposedChart (combination charts)
- Treemap
- Sankey
- FunnelChart

### Basic Usage

```jsx
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts'

const data = [
  { month: 'Jan', value: 100 },
  { month: 'Feb', value: 150 },
  { month: 'Mar', value: 200 },
]

<LineChart width={600} height={300} data={data}>
  <XAxis dataKey="month" />
  <YAxis />
  <Tooltip />
  <Line type="monotone" dataKey="value" stroke="#8884d8" />
</LineChart>
```

### Responsive Charts

```jsx
import { ResponsiveContainer, LineChart, Line } from 'recharts'

<ResponsiveContainer width="100%" height={400}>
  <LineChart data={data}>
    <Line dataKey="value" />
  </LineChart>
</ResponsiveContainer>
```

### Customization Examples

#### Custom Colors
```jsx
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

<PieChart>
  <Pie data={data}>
    {data.map((entry, index) => (
      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
    ))}
  </Pie>
</PieChart>
```

#### Custom Tooltip
```jsx
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p>{`${payload[0].name}: ${payload[0].value}`}</p>
      </div>
    )
  }
  return null
}

<LineChart data={data}>
  <Tooltip content={<CustomTooltip />} />
  <Line dataKey="value" />
</LineChart>
```

### Learning Resources
- [Official Docs](https://recharts.org/en-US/)
- [Examples Gallery](https://recharts.org/en-US/examples)
- [API Reference](https://recharts.org/en-US/api)
- [GitHub Discussions](https://github.com/recharts/recharts/discussions)

---

## Quick Examples

### Adding Pagination to DataTable

```jsx
import { getPaginationRowModel } from '@tanstack/react-table'

const table = useReactTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
})

// In JSX
<div>
  <button onClick={() => table.previousPage()}>Previous</button>
  <button onClick={() => table.nextPage()}>Next</button>
</div>
```

### Creating a Stacked Bar Chart

```jsx
<BarChart data={data}>
  <XAxis dataKey="month" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Bar dataKey="node" stackId="a" fill="#8884d8" />
  <Bar dataKey="go" stackId="a" fill="#82ca9d" />
  <Bar dataKey="react" stackId="a" fill="#ffc658" />
</BarChart>
```

### Creating an Area Chart

```jsx
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

<AreaChart data={data}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="month" />
  <YAxis />
  <Tooltip />
  <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
</AreaChart>
```

### Adding Filtering to DataTable

```jsx
import { getFilteredRowModel } from '@tanstack/react-table'
import { useState } from 'react'

const [filtering, setFiltering] = useState('')

const table = useReactTable({
  data,
  columns,
  state: {
    globalFilter: filtering,
  },
  onGlobalFilterChange: setFiltering,
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
})

// In JSX
<input
  value={filtering}
  onChange={e => setFiltering(e.target.value)}
  placeholder="Search..."
/>
```

---

## Additional Resources

### Performance Tips

**TanStack Table:**
- Use `useMemo` for columns and data
- Enable virtualization for 100k+ rows
- Implement server-side pagination for very large datasets
- Use `React.memo` for custom cell components

**Recharts:**
- Limit data points (500-1000 max for smooth performance)
- Use `ResponsiveContainer` instead of fixed dimensions
- Debounce updates when data changes frequently
- Consider using `connectNulls` prop for sparse data

### Alternatives Considered

**Table Libraries:**
- **AG Grid**: More features but commercial license for advanced features
- **MUI DataGrid**: Tied to Material-UI, less flexible
- **React Data Grid**: Good but less maintained

**Chart Libraries:**
- **Chart.js**: Not React-native, requires wrapper
- **Victory**: Good but larger bundle size
- **Nivo**: Beautiful but heavier and more opinionated
- **Visx**: More low-level, steeper learning curve

### Community and Support

**TanStack Table:**
- Discord: https://discord.com/invite/WrRKjPJ
- Twitter: [@tannerlinsley](https://twitter.com/tannerlinsley)
- GitHub Issues: Very responsive

**Recharts:**
- GitHub Issues: Active community
- Stack Overflow: Many answered questions
- CodeSandbox: Many examples available

### Version Compatibility

This project uses:
- React 19 ✅
- TanStack Table 8.x ✅
- Recharts 2.x ✅

All libraries are compatible and actively maintained.

### License Compliance

Both libraries use MIT License, which allows:
- ✅ Commercial use
- ✅ Modification
- ✅ Distribution
- ✅ Private use

Requirements:
- Include copyright notice
- Include license text

No warranty or liability is provided.

---

## Contributing

If you add new features using these libraries:

1. Update this documentation
2. Add examples to component files
3. Update the main README
4. Test responsiveness and accessibility
5. Check bundle size impact

## Questions?

- Check library documentation first
- Search GitHub issues
- Join community Discord/forums
- Create issue in this repo if project-specific

