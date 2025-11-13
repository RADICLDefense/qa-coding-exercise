import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../components/HealthCheck/Header'
import { ServiceStatus } from '../components/HealthCheck/ServiceStatus'
import { FetchedDataView } from '../components/HealthCheck/FetchedDataView'
import { DataVisualization } from '../components/HealthCheck/DataVisualization'
import { GettingStarted } from '../components/HealthCheck/GettingStarted'
import { useAppStore } from '../store/useAppStore'
import '../App.css'

export function HealthCheck() {
  const fetchHealthStatus = useAppStore((state) => state.fetchHealthStatus)

  useEffect(() => {
    fetchHealthStatus()
  }, [fetchHealthStatus])

  return (
    <div className="app">
      <div style={{ padding: '1rem', background: '#1A1A1D', borderRadius: '8px', marginBottom: '1rem' }}>
        <Link 
          to="/" 
          style={{ 
            color: '#81B4D4', 
            textDecoration: 'none', 
            fontSize: '1rem',
            fontWeight: '500',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          ← Back to Dashboard
        </Link>
      </div>
      
      <Header />

      <main className="main">
        <ServiceStatus />
        <FetchedDataView />
        <DataVisualization />
        <GettingStarted />
      </main>
    </div>
  )
}

