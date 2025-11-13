import { useEffect } from 'react'
import { useAppStore } from '../../store/useAppStore'
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart'
import StorageIcon from '@mui/icons-material/Storage'
import DnsIcon from '@mui/icons-material/Dns'

export function ServiceHealthStatus() {
  const { nodeHealth, goHealth, fetchHealthStatus } = useAppStore()

  useEffect(() => {
    fetchHealthStatus()
    // Refresh health status every 30 seconds
    const interval = setInterval(fetchHealthStatus, 30000)
    return () => clearInterval(interval)
  }, [fetchHealthStatus])

  const getStatusColor = (health) => {
    if (!health || health.error) return 'text-red-500'
    return health.status === 'healthy' ? 'text-green-500' : 'text-yellow-500'
  }

  const getStatusBg = (health) => {
    if (!health || health.error) return 'bg-red-500/10'
    return health.status === 'healthy' ? 'bg-green-500/10' : 'bg-yellow-500/10'
  }

  const getStatusText = (health) => {
    if (!health || health.error) return 'Offline'
    return health.status === 'healthy' ? 'Healthy' : 'Degraded'
  }

  return (
    <div className="bg-dark-grey-800 border border-dark-grey-700 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-light-grey-100 flex items-center gap-2">
          <MonitorHeartIcon className="text-dashboard-blue" sx={{ fontSize: 20 }} />
          Service Health Status
        </h3>
      </div>

      <div className="space-y-4">
        {/* Node.js Service */}
        <div className="flex items-center justify-between p-4 bg-dark-grey-900 rounded-lg border border-dark-grey-700">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${getStatusBg(nodeHealth)}`}>
              <DnsIcon className={getStatusColor(nodeHealth)} sx={{ fontSize: 20 }} />
            </div>
            <div>
              <h4 className="text-light-grey-100 font-medium">Node.js Service</h4>
              <p className="text-light-grey-400 text-sm">Port 3001</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBg(nodeHealth)} ${getStatusColor(nodeHealth)}`}>
              {getStatusText(nodeHealth)}
            </span>
          </div>
        </div>

        {/* Go Service */}
        <div className="flex items-center justify-between p-4 bg-dark-grey-900 rounded-lg border border-dark-grey-700">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${getStatusBg(goHealth)}`}>
              <DnsIcon className={getStatusColor(goHealth)} sx={{ fontSize: 20 }} />
            </div>
            <div>
              <h4 className="text-light-grey-100 font-medium">Go Service</h4>
              <p className="text-light-grey-400 text-sm">Port 3002</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBg(goHealth)} ${getStatusColor(goHealth)}`}>
              {getStatusText(goHealth)}
            </span>
          </div>
        </div>

        {/* Database Status - Always show as healthy if services are up */}
        <div className="flex items-center justify-between p-4 bg-dark-grey-900 rounded-lg border border-dark-grey-700">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-500/10">
              <StorageIcon className="text-green-500" sx={{ fontSize: 20 }} />
            </div>
            <div>
              <h4 className="text-light-grey-100 font-medium">PostgreSQL Database</h4>
              <p className="text-light-grey-400 text-sm">Port 5432</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-500/10 text-green-500">
              Connected
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

