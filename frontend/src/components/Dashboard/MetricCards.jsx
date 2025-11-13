import { useEffect, useState } from 'react'
import { Skeleton } from '@mui/material'
import SecurityIcon from '@mui/icons-material/Security'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { useAppStore } from '../../store/useAppStore'

export function MetricCards({ loading = false }) {
  const { severityDistribution, fetchSeverityDistribution } = useAppStore()
  const [metrics, setMetrics] = useState([
    {
      label: 'Total Security Events',
      value: '0',
      icon: SecurityIcon,
      trend: null,
      color: 'from-sky-blue to-sky-blue-dark',
    },
    {
      label: 'Critical/High Events',
      value: '0',
      icon: WarningAmberIcon,
      trend: null,
      color: 'from-burnt-orange to-burnt-orange-dark',
    },
    {
      label: 'Active Incidents',
      value: '2',
      icon: ErrorOutlineIcon,
      trend: 'RESPONDING',
      trendColor: 'text-red-400',
      color: 'from-red-500 to-red-600',
    },
    {
      label: 'Mean Response Time',
      value: '8m',
      icon: AccessTimeIcon,
      trend: '-15%',
      trendColor: 'text-green-400',
      color: 'from-green-500 to-green-600',
    },
  ])

  useEffect(() => {
    fetchSeverityDistribution()
  }, [fetchSeverityDistribution])

  useEffect(() => {
    if (severityDistribution?.length > 0) {
      const totalEvents = severityDistribution.reduce(
        (sum, item) => sum + parseInt(item.count || 0),
        0
      )
      
      const criticalHighEvents = severityDistribution
        .filter(item => item.severity === 'Critical' || item.severity === 'High')
        .reduce((sum, item) => sum + parseInt(item.count || 0), 0)

      // Calculate trend for critical/high (mock calculation)
      const criticalHighPercentage = totalEvents > 0 
        ? ((criticalHighEvents / totalEvents) * 100).toFixed(0)
        : 0

      setMetrics([
        {
          label: 'Total Security Events',
          value: totalEvents.toLocaleString(),
          icon: SecurityIcon,
          trend: '+5.2%',
          trendColor: 'text-burnt-orange',
          color: 'from-sky-blue to-sky-blue-dark',
        },
        {
          label: 'Critical/High Events',
          value: criticalHighEvents.toLocaleString(),
          icon: WarningAmberIcon,
          trend: `${criticalHighPercentage}% of total`,
          trendColor: 'text-burnt-orange',
          color: 'from-burnt-orange to-burnt-orange-dark',
        },
        {
          label: 'Active Incidents',
          value: '2',
          icon: ErrorOutlineIcon,
          trend: 'RESPONDING',
          trendColor: 'text-red-400',
          color: 'from-red-500 to-red-600',
        },
        {
          label: 'Mean Response Time',
          value: '8m',
          icon: AccessTimeIcon,
          trend: '-15%',
          trendColor: 'text-green-400',
          color: 'from-green-500 to-green-600',
        },
      ])
    }
  }, [severityDistribution])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="bg-dark-grey-800 border border-dark-grey-700 rounded-lg p-5 hover:border-dark-grey-600 transition-all hover:shadow-lg hover:shadow-burnt-orange/10"
        >
          <div className="flex items-center gap-4">
            {/* Icon on the left */}
            <div className={`p-3 rounded-lg bg-gradient-to-br ${metric.color} flex-shrink-0`}>
              <metric.icon className="w-6 h-6 text-white" />
            </div>
            
            {/* Label and value on the right */}
            <div className="flex-1 min-w-0">
              <p className="text-gray-400 text-sm mb-1">{metric.label}</p>
              {loading ? (
                <Skeleton
                  variant="text"
                  width="60%"
                  height={28}
                  sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }}
                />
              ) : (
                <div className="flex items-baseline gap-2">
                  <p className="text-white text-2xl font-bold">{metric.value}</p>
                  {metric.trend && (
                    <span className={`${metric.trendColor || 'text-green-400'} text-sm font-medium`}>
                      {metric.trend}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

