import { Skeleton } from '@mui/material'

const threatTypes = [
  { name: 'Malware Infections', value: 342, max: 400, color: 'bg-burnt-orange' },
  { name: 'Phishing Attempts', value: 287, max: 400, color: 'bg-sky-blue' },
  { name: 'DDoS Attacks', value: 156, max: 400, color: 'bg-deep-purple' },
  { name: 'Intrusion Attempts', value: 234, max: 400, color: 'bg-red-500' },
  { name: 'Ransomware', value: 89, max: 400, color: 'bg-yellow-500' },
  { name: 'Data Exfiltration', value: 139, max: 400, color: 'bg-green-500' },
]

export function TopThreatTypes({ loading = false }) {
  return (
    <div className="bg-dark-grey-800 border border-dark-grey-700 rounded-lg p-6 h-full flex flex-col">
      <h3 className="text-white text-lg font-bold mb-6">Top Threat Types</h3>
      
      <div className="flex-1 flex flex-col justify-evenly">
        {threatTypes.map((threat, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300 text-sm">{threat.name}</span>
              {loading ? (
                <Skeleton
                  variant="text"
                  width={60}
                  height={20}
                  sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }}
                />
              ) : (
                <span className="text-white font-bold text-sm">{threat.value} events</span>
              )}
            </div>
            {loading ? (
              <Skeleton
                variant="rectangular"
                width="100%"
                height={8}
                sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px' }}
              />
            ) : (
              <div className="relative h-2 bg-dark-grey-700 rounded-full overflow-hidden">
                <div
                  className={`absolute inset-y-0 left-0 ${threat.color} rounded-full transition-all duration-500`}
                  style={{ width: `${(threat.value / threat.max) * 100}%` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

