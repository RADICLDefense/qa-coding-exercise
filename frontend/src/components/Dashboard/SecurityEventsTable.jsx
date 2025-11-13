import { useEffect, useState } from 'react'
import { useAppStore } from '../../store/useAppStore'
import ShieldIcon from '@mui/icons-material/Shield'
import WarningIcon from '@mui/icons-material/Warning'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import RefreshIcon from '@mui/icons-material/Refresh'

export function SecurityEventsTable() {
  const { securityEvents, fetchSecurityEvents, refreshSecurityEvents } = useAppStore()
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      await fetchSecurityEvents()
      setLoading(false)
    }
    loadData()
  }, [fetchSecurityEvents])

  const handleRefresh = async () => {
    setLoading(true)
    await fetchSecurityEvents()
    setLoading(false)
  }

  const handleRefreshTimestamps = async () => {
    setRefreshing(true)
    try {
      await refreshSecurityEvents()
    } catch (error) {
      console.error('Failed to refresh timestamps:', error)
    }
    setRefreshing(false)
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical':
        return 'text-red-500 bg-red-500/10 border-red-500/20'
      case 'High':
        return 'text-orange-500 bg-orange-500/10 border-orange-500/20'
      case 'Medium':
        return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20'
      case 'Low':
        return 'text-blue-500 bg-blue-500/10 border-blue-500/20'
      default:
        return 'text-light-grey-400 bg-dark-grey-700/10 border-dark-grey-700/20'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'text-red-500 bg-red-500/10'
      case 'Investigating':
        return 'text-yellow-500 bg-yellow-500/10'
      case 'Resolved':
        return 'text-green-500 bg-green-500/10'
      case 'False Positive':
        return 'text-light-grey-400 bg-dark-grey-700/10'
      default:
        return 'text-light-grey-400 bg-dark-grey-700/10'
    }
  }

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const year = date.getFullYear()
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')   
    return `${month}/${day}/${year} ${hours}:${minutes}`
  }

  const getThreatScoreColor = (score) => {
    if (score >= 80) return 'text-red-500'
    if (score >= 60) return 'text-orange-500'
    if (score >= 40) return 'text-yellow-500'
    return 'text-green-500'
  }

  if (loading) {
    return (
      <div className="bg-dark-grey-800 border border-dark-grey-700 rounded-lg p-6">
        <div className="flex items-center justify-center h-64">
          <RefreshIcon className="text-dashboard-blue animate-spin" sx={{ fontSize: 32 }} />
        </div>
      </div>
    )
  }

  return (
    <div className="bg-dark-grey-800 border border-dark-grey-700 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-light-grey-100 flex items-center gap-2">
          <ShieldIcon className="text-dashboard-blue" sx={{ fontSize: 20 }} />
          Real-time Security Events
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={handleRefreshTimestamps}
            disabled={refreshing || loading}
            className="px-3 py-1.5 bg-dashboard-blue/10 hover:bg-dashboard-blue/20 border border-dashboard-blue/30 rounded-lg transition-colors text-dashboard-blue text-sm font-medium flex items-center gap-2"
            title="Refresh event timestamps"
          >
            <RefreshIcon className={refreshing ? 'animate-spin' : ''} sx={{ fontSize: 16 }} />
            Refresh Timestamps
          </button>
          <button
            onClick={handleRefresh}
            disabled={loading || refreshing}
            className="p-2 hover:bg-dark-grey-700 rounded-lg transition-colors"
            title="Reload data"
          >
            <RefreshIcon className={`text-light-grey-400 ${loading ? 'animate-spin' : ''}`} sx={{ fontSize: 16 }} />
          </button>
        </div>
      </div>

      {!securityEvents || securityEvents.length === 0 ? (
        <div className="text-center py-12">
          <WarningIcon className="text-light-grey-600 mx-auto mb-3" sx={{ fontSize: 48 }} />
          <p className="text-light-grey-400">No security events found</p>
        </div>
      ) : (
        <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
          <table className="w-full">
            <thead className="sticky top-0 bg-dark-grey-800 z-10">
              <tr className="border-b border-dark-grey-700">
                <th className="text-left text-light-grey-400 text-sm font-medium pb-3 pr-4">Event Type</th>
                <th className="text-left text-light-grey-400 text-sm font-medium pb-3 pr-4">Severity</th>
                <th className="text-left text-light-grey-400 text-sm font-medium pb-3 pr-4">Status</th>
                <th className="text-left text-light-grey-400 text-sm font-medium pb-3 pr-4">Target System</th>
                <th className="text-left text-light-grey-400 text-sm font-medium pb-3 pr-4">Source IP</th>
                <th className="text-left text-light-grey-400 text-sm font-medium pb-3 pr-4">Threat Score</th>
                <th className="text-left text-light-grey-400 text-sm font-medium pb-3">Time</th>
              </tr>
            </thead>
            <tbody>
              {securityEvents.slice(0, 10).map((event) => (
                <tr 
                  key={event.event_id} 
                  className="border-b border-dark-grey-700/50 hover:bg-dark-grey-900/50 transition-colors"
                >
                  <td className="py-4 pr-4">
                    <span className="text-light-grey-100 font-medium">{event.event_type}</span>
                  </td>
                  <td className="py-4 pr-4">
                    <span className={`px-2 py-1 rounded text-sm font-medium border ${getSeverityColor(event.severity)}`}>
                      {event.severity}
                    </span>
                  </td>
                  <td className="py-4 pr-4">
                    <span className={`px-2 py-1 rounded text-sm font-medium ${getStatusColor(event.status)}`}>
                      {event.status}
                    </span>
                  </td>
                  <td className="py-4 pr-4">
                    <span className="text-light-grey-300 text-sm font-mono">{event.target_system}</span>
                  </td>
                  <td className="py-4 pr-4">
                    <span className="text-light-grey-400 text-sm font-mono">{event.source_ip}</span>
                  </td>
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-2">
                      <TrendingUpIcon className={getThreatScoreColor(event.threat_score)} sx={{ fontSize: 16 }} />
                      <span className={`font-semibold ${getThreatScoreColor(event.threat_score)}`}>
                        {event.threat_score}
                      </span>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="text-light-grey-400 text-sm">{formatTimestamp(event.timestamp)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {securityEvents && securityEvents.length > 0 && (
        <div className="mt-4 pt-4 border-t border-dark-grey-700">
          <p className="text-light-grey-400 text-sm">
            Showing {Math.min(10, securityEvents.length)} of {securityEvents.length} event{securityEvents.length !== 1 ? 's' : ''}
            {securityEvents.length > 10 && <span className="ml-2 text-dashboard-blue">(scroll for more)</span>}
          </p>
        </div>
      )}
    </div>
  )
}

