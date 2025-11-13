import { Skeleton } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import CloseIcon from '@mui/icons-material/Close'
import PublicIcon from '@mui/icons-material/Public'

export function GeographicThreatMap({ loading = false }) {
  return (
    <div className="bg-dark-grey-800 border border-dark-grey-700 rounded-lg p-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white text-lg font-bold">Geographic Threat Map</h3>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-dark-grey-700 rounded-lg transition-colors">
            <MoreVertIcon className="text-dark-grey-500" />
          </button>
          <button className="p-2 hover:bg-dark-grey-700 rounded-lg transition-colors">
            <CloseIcon className="text-dark-grey-500" />
          </button>
        </div>
      </div>

      {/* Map placeholder with grid pattern */}
      <div className="relative h-64 bg-gradient-to-br from-dark-grey-900 to-dark-grey-800 rounded-lg mb-6 flex items-center justify-center overflow-hidden">
        {loading ? (
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)' }}
          />
        ) : (
          <>
            {/* Grid pattern to simulate map coordinates */}
            <div className="absolute inset-0">
              {/* Vertical lines (longitude) */}
              {[10, 20, 30, 40, 50, 60, 70, 80, 90].map((pos) => (
                <div
                  key={`v-${pos}`}
                  className="absolute top-0 bottom-0 border-l border-dark-grey-700/30"
                  style={{ left: `${pos}%` }}
                />
              ))}
              {/* Horizontal lines (latitude) */}
              {[20, 40, 60, 80].map((pos) => (
                <div
                  key={`h-${pos}`}
                  className="absolute left-0 right-0 border-t border-dark-grey-700/30"
                  style={{ top: `${pos}%` }}
                />
              ))}
              {/* Equator line - slightly brighter */}
              <div className="absolute left-0 right-0 border-t border-dark-grey-600/40" style={{ top: '50%' }} />
              {/* Prime meridian - slightly brighter */}
              <div className="absolute top-0 bottom-0 border-l border-dark-grey-600/40" style={{ left: '50%' }} />
            </div>

            {/* Subtle world map icon in background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5">
              <PublicIcon sx={{ fontSize: 180 }} className="text-white" />
            </div>
          </>
        )}

        {/* Threat marker simulation - representing attack sources */}
        {!loading && (
          <>
            {/* Asia-Pacific - High threat volume */}
            <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50 z-10"></div>
            <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-red-500/20 rounded-full animate-ping z-10"></div>
            
            {/* Eastern Europe - Medium threat */}
            <div className="absolute top-1/4 left-1/2 w-3 h-3 bg-burnt-orange rounded-full animate-pulse shadow-lg shadow-burnt-orange/50 z-10"></div>
            
            {/* North America - Low threat */}
            <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-sky-blue rounded-full animate-pulse z-10"></div>
            
            {/* South America */}
            <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-deep-purple rounded-full animate-pulse z-10"></div>
            
            {/* Africa */}
            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-yellow-500 rounded-full animate-pulse z-10"></div>
          </>
        )}
      </div>

      {/* Top Threat Sources */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-1">Threat Origins</p>
          {loading ? (
            <Skeleton
              variant="text"
              width="100%"
              height={32}
              sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }}
            />
          ) : (
            <p className="text-white text-xl font-bold">47</p>
          )}
          <p className="text-gray-500 text-sm">countries</p>
        </div>
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-1">Blocked IPs</p>
          {loading ? (
            <Skeleton
              variant="text"
              width="100%"
              height={32}
              sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }}
            />
          ) : (
            <p className="text-white text-xl font-bold">2,341</p>
          )}
          <p className="text-gray-500 text-sm">last 24h</p>
        </div>
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-1">Active Attacks</p>
          {loading ? (
            <Skeleton
              variant="text"
              width="100%"
              height={32}
              sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }}
            />
          ) : (
            <p className="text-white text-xl font-bold">156</p>
          )}
          <p className="text-gray-500 text-sm">in progress</p>
        </div>
      </div>

      {/* Threat Alert */}
      <div className="mt-6 p-4 bg-dark-grey-900 rounded-lg border border-red-500/30">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <p className="text-red-500 text-sm font-medium">High Alert - Asia-Pacific Region</p>
        </div>
        <p className="text-gray-400 text-sm mb-2">
          Coordinated DDoS attack detected from multiple IPs in the APAC region. Auto-mitigation rules deployed.
        </p>
        <p className="text-gray-500 text-xs">
          Detected: {new Date().toLocaleString(undefined, { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit', 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
          }).replace(',', '')}
        </p>
      </div>

      {/* Top Attack Sources */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-400 text-sm mb-1">Top Source #1</p>
          <p className="text-white font-bold">Asia-Pacific</p>
          <p className="text-red-500 text-sm">487 THREATS</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm mb-1">Top Source #2</p>
          <p className="text-white font-bold">Eastern Europe</p>
          <p className="text-burnt-orange text-sm">234 THREATS</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm mb-1">Firewall Rules</p>
          <p className="text-white font-bold">1,847 <span className="text-green-400 text-sm">ACTIVE</span></p>
        </div>
        <div>
          <p className="text-gray-400 text-sm mb-1">Detection Rate</p>
          <p className="text-white font-bold">99.7% <span className="text-green-400 text-sm">ACCURACY</span></p>
        </div>
      </div>
    </div>
  )
}

