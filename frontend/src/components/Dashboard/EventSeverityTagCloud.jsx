import { useEffect, useState } from 'react'
import { TagCloud } from 'react-tagcloud'
import { Skeleton } from '@mui/material'
import { useAppStore } from '../../store/useAppStore'

const severityConfig = {
  Critical: {
    color: '#ef4444', // red-500
  },
  High: {
    color: '#f97316', // orange-500
  },
  Medium: {
    color: '#eab308', // yellow-500
  },
  Low: {
    color: '#9ca3af', // gray-400 (light grey)
  },
}

const customRenderer = (tag, size) => {
  const config = severityConfig[tag.value]
  const tagColor = config?.color || '#ffffff'
  
  return (
    <span
      key={tag.value}
      style={{
        fontSize: `${size}px`,
        color: tagColor,
        margin: '8px',
        padding: '12px 20px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        cursor: 'pointer',
        fontWeight: 'bold',
        textShadow: `0 0 20px ${tagColor}, 0 0 10px ${tagColor}`,
        transition: 'all 0.3s ease',
        backgroundColor: `${tagColor}20`,
        borderRadius: '12px',
        border: `2px solid ${tagColor}60`,
      }}
      className="tag-cloud-tag"
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1)'
        e.currentTarget.style.backgroundColor = `${tagColor}35`
        e.currentTarget.style.borderColor = `${tagColor}80`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)'
        e.currentTarget.style.backgroundColor = `${tagColor}20`
        e.currentTarget.style.borderColor = `${tagColor}60`
      }}
    >
      <span>{tag.value}</span>
      <span
        style={{
          fontSize: `${size * 0.5}px`,
          opacity: 0.9,
          fontWeight: 'normal',
          marginLeft: '4px',
        }}
      >
        ({tag.count})
      </span>
    </span>
  )
}

export function EventSeverityTagCloud({ loading = false }) {
  const { severityDistribution, fetchSeverityDistribution } = useAppStore()
  const [cloudData, setCloudData] = useState([])

  useEffect(() => {
    fetchSeverityDistribution()
  }, [fetchSeverityDistribution])

  useEffect(() => {
    if (severityDistribution?.length > 0) {
      const formatted = severityDistribution.map((item) => ({
        value: item.severity,
        count: parseInt(item.count),
      }))
      setCloudData(formatted)
    }
  }, [severityDistribution])

  const totalEvents = cloudData.reduce((sum, item) => sum + item.count, 0)

  return (
    <div className="bg-dark-grey-800 border border-dark-grey-700 rounded-lg p-6 h-full flex flex-col">
      <h3 className="text-white text-lg font-bold mb-4">Event Severity Distribution</h3>
      
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              height={60}
              sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', borderRadius: '8px' }}
            />
          ))}
        </div>
      ) : cloudData.length > 0 ? (
        <div className="py-4 flex gap-6">
          <div 
            className="flex-1 flex flex-wrap justify-center items-center gap-4"
            style={{ minHeight: '300px' }}
          >
            <TagCloud
              minSize={28}
              maxSize={68}
              tags={cloudData}
              renderer={customRenderer}
              shuffle={false}
              className="tag-cloud"
              disableRandomColor={true}
              onClick={(tag) => console.log(`Clicked: ${tag.value} (${tag.count} events)`)}
              style={{ 
                width: '100%',
                textAlign: 'center',
              }}
            />
          </div>

          <div className="pl-6 border-l border-dark-grey-700 flex flex-col justify-center">
            <div className="flex justify-end items-center gap-2">
              <span className="text-gray-300 text-sm">Total Security Events</span>
              <span className="text-white font-bold text-lg">{totalEvents}</span>
            </div>
            
            <div className="mt-4 flex flex-col items-end gap-2 text-sm">
              {cloudData.map((item) => {
                const percentage = totalEvents > 0 ? ((item.count / totalEvents) * 100).toFixed(1) : 0
                const config = severityConfig[item.value]
                const itemColor = config?.color || '#9ca3af'
                return (
                  <div key={item.value} className="flex items-center gap-2">
                    <span style={{ color: itemColor, fontWeight: 'bold' }}>
                      {item.value}
                    </span>
                    <span style={{ color: itemColor, fontWeight: 'bold' }}>{percentage}%</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400">No security events found</p>
        </div>
      )}
    </div>
  )
}

