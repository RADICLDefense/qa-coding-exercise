import { Skeleton } from '@mui/material'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

const incidents = [
  { 
    name: 'Ransomware Attack - Finance Dept', 
    detected: '2 hours ago',
    severity: 'CRITICAL',
    affectedSystems: '12',
    responseProgress: '75%', 
    color: 'text-red-500',
    bgColor: 'bg-red-500/20',
    progressColor: 'bg-red-500',
    icon: ErrorOutlineIcon,
    status: 'Containing',
    details: 'Incident contained, 9 of 12 systems quarantined and being remediated'
  },
  { 
    name: 'DDoS Attack - Web Infrastructure', 
    detected: '45 minutes ago',
    severity: 'HIGH',
    affectedSystems: '5',
    responseProgress: '60%', 
    color: 'text-burnt-orange',
    bgColor: 'bg-burnt-orange/20',
    progressColor: 'bg-burnt-orange',
    icon: WarningAmberIcon,
    status: 'Mitigating',
    details: 'Traffic filtering applied, load balancers responding normally'
  },
]

export function ActiveSecurityIncidents({ loading = false }) {
  return (
    <div className="bg-dark-grey-800 border border-dark-grey-700 rounded-lg p-6 h-full flex flex-col">
      <h3 className="text-white text-lg font-bold">Active Security Incidents</h3>
      
      <div className="flex-1 flex flex-col justify-evenly">
        {incidents.map((incident, index) => (
          <div key={index} className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">{incident.name}</p>
                <p className="text-gray-400 text-sm">
                  Detected {incident.detected} • Status: {incident.status}
                </p>
              </div>
              {loading ? (
                <Skeleton
                  variant="text"
                  width={80}
                  height={24}
                  sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }}
                />
              ) : (
                <span className={`${incident.color} font-bold text-sm px-2 py-1 rounded border ${incident.color.replace('text-', 'border-')}`}>
                  {incident.severity}
                </span>
              )}
            </div>

            {/* Incident stats */}
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-lg ${incident.bgColor} flex items-center justify-center flex-shrink-0`}>
                <incident.icon className={incident.color} />
              </div>
              <div className="flex-1 grid grid-cols-2 gap-3">
                <div className="bg-dark-grey-900 rounded-lg p-3">
                  <p className="text-gray-400 text-sm mb-1">Affected Systems</p>
                  <p className="text-white font-bold text-sm">{incident.affectedSystems}</p>
                </div>
                <div className="bg-dark-grey-900 rounded-lg p-3">
                  <p className="text-gray-400 text-sm mb-1">Response Progress</p>
                  <p className="text-white font-bold text-sm">{incident.responseProgress}</p>
                </div>
              </div>
            </div>

            {/* Progress bar */}
            {loading ? (
              <Skeleton
                variant="rectangular"
                width="100%"
                height={6}
                sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px' }}
              />
            ) : (
              <div className="relative h-1.5 bg-dark-grey-700 rounded-full overflow-hidden">
                <div
                  className={`absolute inset-y-0 left-0 ${incident.progressColor} rounded-full transition-all duration-500`}
                  style={{ width: incident.responseProgress }}
                />
              </div>
            )}

            <div className="flex justify-between text-sm">
              <span className="text-gray-400">{incident.details}</span>
              <span className={incident.color}>{incident.responseProgress} COMPLETE</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

